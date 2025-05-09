import { NETWORK_CONFIG } from '@smartinvoicexyz/constants'
import { Milestone as MilestoneMetadata } from '@smartinvoicexyz/types'
import { Box, Button, Spinner, Stack, Text, atoms } from '@zoralabs/zord'
import axios from 'axios'
import { getFetchableUrls } from 'ipfs-service'
import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import useSWR from 'swr'
import { Hex, encodeFunctionData, formatEther, isAddressEqual } from 'viem'
import { useContractRead } from 'wagmi'

import Accordion from 'src/components/Home/accordian'
import { Icon } from 'src/components/Icon'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { SAFE_APP_URL } from 'src/constants/safe'
import SWR_KEYS from 'src/constants/swrKeys'
import { useEnsData } from 'src/hooks/useEnsData'
import { TransactionType } from 'src/modules/create-proposal'
import {
  decodeEscrowData,
  decodeEscrowDataV1,
  getEscrowBundlerV1,
} from 'src/modules/create-proposal/components/TransactionForm/Escrow/EscrowUtils'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { useDaoStore } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'
import { AddressType, CHAIN_ID } from 'src/typings'

import { DecodedTransaction } from './useDecodedTransactions'

const RELEASE_FUNCTION_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: '_milestone', type: 'uint256' }],
    name: 'release',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const createAppUrl = (chainId: CHAIN_ID, invoiceAddress: Hex) => {
  return `https://app.smartinvoice.xyz/invoice/${chainId}/${invoiceAddress}`
}

const createSafeAppUrl = (chainId: CHAIN_ID, safeAddress: Hex, invoiceAddress: Hex) => {
  const safeUrl = SAFE_APP_URL[chainId]
  const encodedUrl = encodeURIComponent(createAppUrl(chainId, invoiceAddress))
  return `${safeUrl}:${safeAddress}&appUrl=${encodedUrl}`
}

const INVOICE_QUERY = `
  query GetInvoice($txHash: String!) {
    invoices(where: {
      creationTxHash: $txHash
    }) {
      address
      id
      createdAt
      network
      creationTxHash
    }
  }
`

interface MilestoneDetailsProps {
  decodedTransaction: DecodedTransaction
  executionTransactionHash?: string
}

interface Document {
  type: string
  src: string
}

export const MilestoneDetails = ({
  decodedTransaction,
  executionTransactionHash,
}: MilestoneDetailsProps) => {
  const router = useRouter()
  const { chain: invoiceChain } = useChainStore()
  const { addresses } = useDaoStore()
  const { addTransaction } = useProposalStore()

  const subgraphURL = useMemo(() => {
    return NETWORK_CONFIG[invoiceChain.id]?.SUBGRAPH
  }, [invoiceChain.id])

  const { data: invoiceAddress, isValidating: isLoadingInvoice } = useSWR(
    [subgraphURL, executionTransactionHash],
    async () => {
      const response = await axios.post(subgraphURL, {
        query: INVOICE_QUERY,
        variables: {
          txHash: executionTransactionHash,
        },
      })

      return _.get(response, 'data.data.invoices[0].address') as AddressType
    }
  )

  const invoiceUrl = !!invoiceAddress
    ? createAppUrl(invoiceChain.id, invoiceAddress)
    : undefined

  const { invoiceCid, clientAddress, milestoneAmounts } = useMemo(() => {
    if (decodedTransaction.isNotDecoded) return {}

    const isEscrowV1 =
      _.toLower(decodedTransaction.target) ===
      _.toLower(getEscrowBundlerV1(invoiceChain.id))

    const decodedTxnArgs = decodedTransaction.transaction?.args

    const { ipfsCid, clientAddress } = isEscrowV1
      ? decodeEscrowDataV1(decodedTxnArgs?._escrowData?.value as Hex)
      : decodeEscrowData(decodedTxnArgs?._escrowData?.value as Hex)

    return {
      invoiceCid: ipfsCid,
      clientAddress: clientAddress as AddressType,
      milestoneAmounts: decodedTxnArgs['_milestoneAmounts']['value']
        .split(',')
        .map((x: string) => formatEther(BigInt(x))),
    }
  }, [decodedTransaction, invoiceChain.id])

  const { data: invoiceData, isValidating: isLoadingInvoiceData } = useSWR(
    invoiceCid ? [SWR_KEYS.IPFS, invoiceCid] : undefined,
    async () => {
      try {
        const response = await axios.get(`https://ipfs.io/ipfs/${invoiceCid}`)
        return response.data
      } catch (error) {
        console.error('Failed to fetch invoice data:', error)
        return null
      }
    }
  )

  const { data: numOfMilestonesReleased, isLoading: isLoadingReleased } = useContractRead(
    {
      address: invoiceAddress,
      enabled: !!invoiceAddress,
      abi: [
        {
          inputs: [],
          name: 'released',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      functionName: 'released',
      chainId: invoiceChain.id,
    }
  )

  const isClientTreasury = useMemo(
    () =>
      clientAddress &&
      addresses.treasury &&
      isAddressEqual(clientAddress, addresses.treasury),
    [clientAddress, addresses.treasury]
  )

  const { displayName: clientDisplayName } = useEnsData(clientAddress)

  const handleReleaseMilestone = useCallback(
    async (index: number) => {
      if (!invoiceAddress) return

      const releaseMilestone = {
        target: invoiceAddress as AddressType,
        functionSignature: 'release(_milestone)',
        calldata: encodeFunctionData({
          abi: RELEASE_FUNCTION_ABI,
          functionName: 'release',
          args: [index],
        }),
        value: '',
      }

      const releaseEscrowTxnData = {
        type: TransactionType.RELEASE_ESCROW_MILESTONE,
        summary: `Release Milestone #${index + 1} for ${invoiceData?.title}`,
        transactions: [releaseMilestone],
      }

      setTimeout(() => addTransaction(releaseEscrowTxnData), 3000)

      router.push({
        pathname: `/dao/[network]/[token]/proposal/review`,
        query: {
          network: router.query?.network,
          token: router.query?.token,
        },
      })
    },
    [router, addTransaction, invoiceData?.title, invoiceAddress]
  )

  const renderMilestoneButton = useCallback(
    (index: number, isReleased: boolean, isNext: boolean) => {
      if (!clientAddress || !invoiceAddress || isReleased || !isNext) {
        return (
          <Button variant="secondary" disabled>
            <Icon id="checkInCircle" />
            Milestone Released
          </Button>
        )
      }

      if (isClientTreasury) {
        return (
          <Button variant="primary" onClick={() => handleReleaseMilestone(index)}>
            Release Milestone
          </Button>
        )
      }

      // TODO: handle other types of escrow delegates, current only supports safe
      return (
        <a
          href={createSafeAppUrl(invoiceChain.id, clientAddress, invoiceAddress)}
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="primary">Release Milestone</Button>
        </a>
      )
    },
    [
      handleReleaseMilestone,
      clientAddress,
      invoiceAddress,
      isClientTreasury,
      invoiceChain.id,
    ]
  )

  const renderDocumentLink = useCallback((doc: Partial<Document>) => {
    if (!doc.src) return null

    const href = doc.type === 'ipfs' ? getFetchableUrls(doc.src)?.[0] : doc.src

    if (!href) return null

    return (
      <Link key={doc.src} href={href}>
        {href}
      </Link>
    )
  }, [])

  const milestonesDetails = useMemo(() => {
    return invoiceData?.milestones?.map((milestone: MilestoneMetadata, index: number) => {
      const releasedCount = Number(numOfMilestonesReleased?.toString() || 0)
      const isReleased = releasedCount - 1 >= index
      const isNext = releasedCount === index

      return {
        title: <Text>{`${index + 1}. ${milestone.title}`}</Text>,
        description: (
          <Stack gap="x5">
            <Stack direction="row" align="center" justify="space-between">
              <Text variant="label-xs" color="tertiary">
                {`Amount: ${milestoneAmounts?.[index]} ETH`}
              </Text>
              <Text variant="label-xs" color="tertiary">
                {`Due by: ${new Date(
                  (milestone?.endDate as number) * 1000
                ).toLocaleDateString()}`}
              </Text>
            </Stack>

            <Text>{milestone.description || 'No Description'}</Text>

            <Stack>{milestone.documents?.map((doc) => renderDocumentLink(doc))}</Stack>

            {!!executionTransactionHash &&
              renderMilestoneButton(index, isReleased, isNext)}
          </Stack>
        ),
      }
    })
  }, [
    invoiceData?.milestones,
    numOfMilestonesReleased,
    milestoneAmounts,
    executionTransactionHash,
    renderMilestoneButton,
    renderDocumentLink,
  ])

  const isLoading = isLoadingInvoice || isLoadingInvoiceData || isLoadingReleased

  if (isLoading) return <Spinner size="md" />

  return (
    <>
      <Accordion items={milestonesDetails || []} />
      {!!invoiceUrl && (
        <Stack direction="column" fontWeight={'heading'} mt="x2" ml="x4" gap="x2">
          {!isClientTreasury && (
            <Stack direction="row" align="center">
              <Text variant="label-sm" color="primary" mr="x2">
                Escrow Release Delegated to
              </Text>
              <Box color={'secondary'} className={atoms({ textDecoration: 'underline' })}>
                <a
                  href={`${ETHERSCAN_BASE_URL[invoiceChain.id]}/address/${clientAddress}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Text variant="label-sm">{clientDisplayName}</Text>
                </a>
              </Box>
            </Stack>
          )}
          <a href={invoiceUrl} target="_blank" rel="noreferrer">
            <Button variant="secondary" size="sm">
              View Smart Invoice
              <Icon id="arrowTopRight" />
            </Button>
          </a>
        </Stack>
      )}
    </>
  )
}

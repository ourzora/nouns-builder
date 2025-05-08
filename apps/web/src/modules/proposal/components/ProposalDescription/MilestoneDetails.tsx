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
import SWR_KEYS from 'src/constants/swrKeys'
import { TransactionType } from 'src/modules/create-proposal'
import {
  decodeEscrowData,
  decodeEscrowDataV1,
  getEscrowBundlerV1,
} from 'src/modules/create-proposal/components/TransactionForm/Escrow/EscrowUtils'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { useDaoStore } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'
import { AddressType } from 'src/typings'

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

const SAFE_APP_URL =
  'https://app.safe.global/share/safe-app?appUrl=https://app.smartinvoice.xyz/invoices'

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

      return _.get(response, 'data.data.invoices[0].address')
    }
  )

  const invoiceUrl = !!invoiceAddress
    ? `https://app.smartinvoice.xyz/invoice/${invoiceChain.id}/${invoiceAddress}`
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
      clientAddress,
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

  const handleReleaseMilestone = useCallback(
    async (index: number) => {
      const isClientTreasury = isAddressEqual(
        clientAddress as AddressType,
        addresses.treasury as AddressType
      )

      if (!isClientTreasury) {
        router.replace(SAFE_APP_URL)
        return
      }

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
    [router, clientAddress, addresses, addTransaction, invoiceData?.title, invoiceAddress]
  )

  const renderMilestoneButton = useCallback(
    (index: number, isReleased: boolean, isNext: boolean) => {
      if (isReleased) {
        return (
          <Button variant="secondary" disabled>
            <Icon id="checkInCircle" />
            Milestone Released
          </Button>
        )
      }

      return (
        <Button
          variant={isNext ? 'primary' : 'secondary'}
          disabled={!isNext}
          onClick={() => isNext && handleReleaseMilestone(index)}
        >
          Release Milestone
        </Button>
      )
    },
    [handleReleaseMilestone]
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
        <Box
          color={'secondary'}
          fontWeight={'heading'}
          className={atoms({ textDecoration: 'underline' })}
          mt="x2"
          ml="x4"
        >
          <a href={invoiceUrl} target="_blank" rel="noreferrer">
            <Stack direction="row" align="center">
              <Text variant="label-sm" color="secondary">
                View escrow details on Smart Invoice
              </Text>
              <Icon id="arrowTopRight" />
            </Stack>
          </a>
        </Box>
      )}
    </>
  )
}

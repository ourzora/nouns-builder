import { NETWORK_CONFIG } from '@smartinvoicexyz/constants'
import { Milestone as MilestoneMetadata } from '@smartinvoicexyz/types'
import { Box, Button, Spinner, Stack, Text, atoms } from '@zoralabs/zord'
import axios from 'axios'
import { getFetchableUrls } from 'ipfs-service'
import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import useSWR from 'swr'
import { Hex, encodeFunctionData, formatEther } from 'viem'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import { waitForTransaction } from 'wagmi/actions'

import Accordion from 'src/components/Home/accordian'
import { Icon } from 'src/components/Icon'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { SAFE_APP_URL } from 'src/constants/safe'
import SWR_KEYS from 'src/constants/swrKeys'
import { useEnsData } from 'src/hooks/useEnsData'
import { useVotes } from 'src/hooks/useVotes'
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

const GET_OWNERS_FUNCTION_ABI = [
  {
    inputs: [],
    name: 'getOwners',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
]

const createSmartInvoiceUrl = (chainId: CHAIN_ID, invoiceAddress: Hex) => {
  return `https://app.smartinvoice.xyz/invoice/${chainId}/${invoiceAddress}`
}

const createSafeAppUrl = (chainId: CHAIN_ID, safeAddress: Hex, appUrl: string) => {
  const safeUrl = SAFE_APP_URL[chainId]
  const encodedUrl = encodeURIComponent(appUrl)
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

export const MilestoneDetails = ({
  decodedTransaction,
  executionTransactionHash,
}: MilestoneDetailsProps) => {
  const router = useRouter()
  const { chain: invoiceChain } = useChainStore()
  const { addresses } = useDaoStore()
  const { addTransaction } = useProposalStore()
  const { address } = useAccount()

  const { hasThreshold } = useVotes({
    chainId: invoiceChain.id,
    governorAddress: addresses?.governor,
    signerAddress: address,
    collectionAddress: addresses?.token,
  })

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
    ? createSmartInvoiceUrl(invoiceChain.id, invoiceAddress)
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

  const { data: hasOwners, error: getOwnersError } = useContractRead({
    enabled: !!clientAddress,
    address: clientAddress,
    abi: GET_OWNERS_FUNCTION_ABI,
    functionName: 'getOwners',
    chainId: invoiceChain.id,
  })

  const isClientAGnosisSafe = useMemo(
    () => !!hasOwners && !getOwnersError,
    [hasOwners, getOwnersError]
  )

  const releasedCount = useMemo(
    () => Number(numOfMilestonesReleased?.toString() || 0),
    [numOfMilestonesReleased]
  )

  const isClientTreasury = useMemo(
    () =>
      clientAddress &&
      addresses.treasury &&
      clientAddress.toLowerCase() === addresses.treasury.toLowerCase(),
    [clientAddress, addresses.treasury]
  )

  const isClientConnected = useMemo(
    () =>
      !!clientAddress &&
      !!address &&
      clientAddress.toLowerCase() === address.toLowerCase(),
    [clientAddress, address]
  )

  const { displayName: clientDisplayName } = useEnsData(clientAddress)

  const handleReleaseMilestoneAsProposal = useCallback(async () => {
    if (!invoiceAddress) return

    const releaseMilestone = {
      target: invoiceAddress as AddressType,
      functionSignature: 'release(_milestone)',
      calldata: encodeFunctionData({
        abi: RELEASE_FUNCTION_ABI,
        functionName: 'release',
        args: [releasedCount],
      }),
      value: '',
    }

    const releaseEscrowTxnData = {
      type: TransactionType.RELEASE_ESCROW_MILESTONE,
      summary: `Release Milestone #${releasedCount + 1} for ${invoiceData?.title}`,
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
  }, [router, addTransaction, invoiceData?.title, invoiceAddress, releasedCount])

  const { config, error } = usePrepareContractWrite({
    enabled: !!invoiceAddress && isClientConnected,
    address: invoiceAddress,
    abi: RELEASE_FUNCTION_ABI,
    functionName: 'release',
    args: [releasedCount],
  })

  const { writeAsync } = useContractWrite(config)

  const [releasing, setReleasing] = useState(false)

  const handleReleaseMilestoneDirect = useCallback(async () => {
    if (!!error) return

    setReleasing(true)
    try {
      const tx = await writeAsync?.()
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
      setReleasing(false)
    } catch (error) {
      setReleasing(false)
    }
  }, [writeAsync, error])

  const isLoading = isLoadingInvoice || isLoadingInvoiceData || isLoadingReleased

  if (isLoading) return <Spinner size="md" />

  return (
    <>
      <Accordion
        items={invoiceData?.milestones?.map(
          (milestone: MilestoneMetadata, index: number) => {
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

                  <Stack>
                    {milestone.documents?.map((doc) => {
                      if (!doc.src) return null

                      const href =
                        doc.type === 'ipfs' ? getFetchableUrls(doc.src)?.[0] : doc.src

                      if (!href) return null

                      return (
                        <Link key={doc.src} href={href}>
                          {href}
                        </Link>
                      )
                    })}
                  </Stack>

                  {!!invoiceAddress &&
                    (() => {
                      if (isReleased) {
                        return (
                          <Button variant="secondary" disabled>
                            <Icon id="checkInCircle" />
                            Milestone Released
                          </Button>
                        )
                      }

                      if (isNext && isClientTreasury) {
                        return (
                          <Button
                            variant="primary"
                            onClick={() => handleReleaseMilestoneAsProposal()}
                            disabled={!hasThreshold}
                          >
                            Release Milestone
                          </Button>
                        )
                      }

                      if (isNext && isClientConnected) {
                        return (
                          <Button
                            variant="primary"
                            onClick={() => handleReleaseMilestoneDirect()}
                            disabled={releasing}
                          >
                            {releasing ? 'Releasing...' : 'Release Milestone'}
                          </Button>
                        )
                      }

                      return null
                    })()}
                </Stack>
              ),
            }
          }
        )}
      />
      {!!invoiceUrl && !!clientAddress && (
        <Stack direction="column" fontWeight={'heading'} mt="x2" ml="x4" gap="x2">
          {isClientTreasury ? (
            <a href={invoiceUrl} target="_blank" rel="noreferrer">
              <Button variant="secondary" size="sm">
                View Smart Invoice
                <Icon id="arrowTopRight" />
              </Button>
            </a>
          ) : (
            <>
              <Stack direction="row" align="center">
                <Text variant="label-sm" color="primary" mr="x2">
                  Escrow Release Delegated to
                </Text>
                <Box
                  color={'secondary'}
                  className={atoms({ textDecoration: 'underline' })}
                >
                  <a
                    href={`${ETHERSCAN_BASE_URL[invoiceChain.id]}/address/${clientAddress}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Text variant="label-sm">{clientDisplayName}</Text>
                  </a>
                </Box>
              </Stack>
              {isClientAGnosisSafe ? (
                <>
                  <a
                    href={createSafeAppUrl(invoiceChain.id, clientAddress, invoiceUrl)}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Button variant="secondary" size="sm">
                      View Smart Invoice As Safe App
                      <Icon id="arrowTopRight" />
                    </Button>
                  </a>
                  {!isClientConnected && (
                    <a
                      href={createSafeAppUrl(
                        invoiceChain.id,
                        clientAddress,
                        window.location.href
                      )}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Button variant="secondary" size="sm">
                        View Proposal As Safe App
                        <Icon id="arrowTopRight" />
                      </Button>
                    </a>
                  )}
                </>
              ) : (
                <a href={invoiceUrl} target="_blank" rel="noreferrer">
                  <Button variant="secondary" size="sm">
                    View Smart Invoice
                    <Icon id="arrowTopRight" />
                  </Button>
                </a>
              )}

            </>
          )}
        </Stack>
      )}
    </>
  )
}

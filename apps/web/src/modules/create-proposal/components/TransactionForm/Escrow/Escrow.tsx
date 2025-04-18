import { Stack } from '@zoralabs/zord'
import { useCallback } from 'hono/jsx'
import { uploadFile } from 'ipfs-service'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'
import { encodeFunctionData, formatEther } from 'viem'
import { useDaoStore } from 'src/modules/dao'

import SWR_KEYS from 'src/constants/swrKeys'
import { ProposalsResponse } from 'src/data/subgraph/requests/proposalsQuery'
import { getProposals } from 'src/data/subgraph/requests/proposalsQuery'
import { TransactionType } from 'src/modules/create-proposal/constants'
import { useProposalStore } from 'src/modules/create-proposal/stores'
import { getChainFromLocalStorage } from 'src/utils/getChainFromLocalStorage'
import { InvoiceMetadata, Milestone as MilestoneMetadata } from '@smartinvoicexyz/types'

import EscrowForm from './EscrowForm'
import { EscrowFormValues } from './EscrowForm.schema'
import {
  encodeEscrowData,
  deployEscrowAbi,
  getEscrowBundler,
  ESCROW_TYPE,
} from './EscrowUtils'

export const Escrow: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ipfsUploadError, setIpfsUploadError] = useState<Error | null>(null)

  const { query, isReady } = useRouter()

  const { id: chainId } = getChainFromLocalStorage()

  const addTransaction = useProposalStore((state) => state.addTransaction)

  const {
    addresses: { treasury },
  } = useDaoStore()

  const { data } = useSWR<ProposalsResponse>(
    isReady ? [SWR_KEYS.PROPOSALS, chainId, query.token, '0'] : null,
    (_, chainId, token, _page) => getProposals(chainId, token, 1, Number(0))
  )

  const lastProposalId = data?.proposals?.[0]?.proposalNumber ?? 0

  const handleEscrowTransaction = useCallback(
    async (values: EscrowFormValues) => {
      if (!treasury) {
        return;
      }
      const ipfsDataToUpload: InvoiceMetadata = {
        title: 'Proposal #' + (lastProposalId + 1),
        description: window?.location.href.replace(
          '/proposal/create',
          '/vote/' + lastProposalId + 1
        ),
        endDate: new Date(
          values.milestones[values.milestones.length - 1].endDate
        ).getTime(),
        milestones: values.milestones.map((x, index) => ({
          id: 'milestone-00' + index,
          title: x.title,
          description: x.description,
          endDate: new Date(x.endDate).getTime() / 1000, // in seconds
          createdAt: Date.now() / 1000, // in seconds
          // set start date 7 days from submission in seconds
          startDate: index === 0 ? (Date.now() / 1000) + 7 * 24 * 60 * 60 : new Date(values.milestones[index - 1].endDate).getTime() / 1000,
          resolverType: 'kleros',
          klerosCourt: 1,
          ...(x.mediaType && x.mediaUrl
            ? {
              documents: [
                {
                  id: 'doc-001',
                  type: 'ipfs',
                  src: x.mediaUrl,
                  mimeType: x.mediaType,
                  createdAt: new Date().getTime() / 1000,
                },
              ],
            }
            : {}),
        } as MilestoneMetadata)),
      }

      const jsonDataToUpload = JSON.stringify(ipfsDataToUpload, null, 2)
      const fileToUpload = new File([jsonDataToUpload], 'escrow-data.json', {
        type: 'application/json',
      })

      let cid: string, uri: string;

      try {
        console.log('Uploading to IPFS...')
        setIsSubmitting(true)
        const response = await uploadFile(fileToUpload, {
          cache: true,
          onProgress: (progress) => {
            console.log(`Upload progress: ${progress}%`)
          },
        })
        cid = response.cid
        uri = response.uri
        setIsSubmitting(false)
        setIpfsUploadError(null)
        console.log('IPFS upload successful. CID:', cid, 'URI:', uri)
      } catch (err: any) {
        console.log('IPFS upload error:', err)
        setIsSubmitting(false)
        setIpfsUploadError(
          new Error(
            `Sorry, there was an error with our file uploading service. ${err?.message}`
          )
        )
        return
      }

      // create bundler transaction data
      const escrowData = encodeEscrowData(values, treasury, cid, chainId)
      const milestoneAmounts = values.milestones.map((x) => x.amount * 10 ** 18)
      const fundAmount = milestoneAmounts.reduce((acc, x) => acc + x, 0)

      const escrow = {
        target: getEscrowBundler(chainId),
        functionSignature: 'deployEscrow()',
        calldata: encodeFunctionData({
          abi: deployEscrowAbi,
          functionName: 'deployEscrow',
          args: [values.recipientAddress, milestoneAmounts, escrowData, ESCROW_TYPE, fundAmount],
        }),
        value: formatEther(BigInt(fundAmount)),
      }

      try {
        addTransaction({
          type: TransactionType.ESCROW,
          summary: `Create and fund new Escrow with ${formatEther(
            BigInt(fundAmount)
          )} ETH`,
          transactions: [escrow],
        })
      } catch (err) {
        console.log('Error Adding Transaction', err)
      }
      setIsSubmitting(false)
    },
    [addTransaction, chainId, lastProposalId, treasury]
  )

  return (
    <Stack>
      <EscrowForm
        onSubmit={handleEscrowTransaction}
        isSubmitting={isSubmitting}
      />
      {ipfsUploadError?.message && <div>Error: {ipfsUploadError.message}</div>}
    </Stack>
  )
}

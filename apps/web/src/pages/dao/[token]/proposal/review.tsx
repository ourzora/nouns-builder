import { Flex, Stack } from '@zoralabs/zord'
import { useRouter } from 'next/router'
import React from 'react'
import { useAccount } from 'wagmi'

import { useVotes } from 'src/hooks'
import { getDaoLayout } from 'src/layouts/DaoLayout'
import {
  CreateProposalHeading,
  ReviewProposalForm,
  useProposalStore,
} from 'src/modules/create-proposal'
import { NextPageWithLayout } from 'src/pages/_app'
import { notFoundWrap } from 'src/styles/404.css'
import { AddressType } from 'src/typings'
import { useDaoStore } from "../../../../modules/dao/stores";

const ReviewProposalPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router

  const { addresses } = useDaoStore()
  const { address } = useAccount()

  const { isLoading, hasThreshold } = useVotes({
    governorAddress: addresses?.governor,
    signerAddress: address,
    collectionAddress: query?.token as AddressType,
  })

  const transactions = useProposalStore((state) => state.transactions)
  const disabled = useProposalStore((state) => state.disabled)
  const title = useProposalStore((state) => state.title)
  const summary = useProposalStore((state) => state.summary)

  if (isLoading) return null

  if (!hasThreshold) {
    return <Flex className={notFoundWrap}>403 - Access Denied</Flex>
  }

  return (
    <Stack mb={'x20'} w={'100%'} px={'x3'} style={{ maxWidth: 1060 }} mx="auto">
      <CreateProposalHeading title={'Review and Submit Proposal'} align={'center'} />
      <Stack w={'100%'} px={'x3'} style={{ maxWidth: 680 }} mx="auto">
        <ReviewProposalForm
          disabled={disabled}
          transactions={transactions}
          title={title}
          summary={summary}
        />
      </Stack>
    </Stack>
  )
}

ReviewProposalPage.getLayout = getDaoLayout

export default ReviewProposalPage

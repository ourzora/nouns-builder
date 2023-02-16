import React from 'react'
import CreateProposalHeading from 'src/modules/transaction-builder/components/CreateProposalHeading'
import { Stack } from '@zoralabs/zord'
import { ReviewProposalForm } from 'src/modules/transaction-builder'
import { useProposalStore } from 'src/modules/transaction-builder/stores/useProposalStore'
import { getDaoLayout } from 'src/layouts/DaoLayout/DaoLayout'
import { NextPageWithLayout } from 'src/pages/_app'
import { useRouter } from 'next/router'

const ReviewProposalPage: NextPageWithLayout = () => {
  const transactions = useProposalStore((state) => state.transactions)
  const disabled = useProposalStore((state) => state.disabled)
  const title = useProposalStore((state) => state.title)
  const summary = useProposalStore((state) => state.summary)

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

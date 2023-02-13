import React from 'react'
import CreateProposalHeading from 'src/modules/transaction-builder/components/CreateProposalHeading'
import { Stack } from '@zoralabs/zord'
import { ReviewProposalForm } from 'src/modules/transaction-builder'
import { useProposalStore } from 'src/modules/transaction-builder/stores/useProposalStore'
import { getDaoLayout } from 'src/layouts/DaoLayout/DaoLayout'
import { NextPageWithLayout } from 'src/pages/_app'

const ReviewProposalPage: NextPageWithLayout = () => {
  const { transactions, disabled, title, summary } = useProposalStore()

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

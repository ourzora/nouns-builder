import React from 'react'
import { useRouter } from 'next/router'
import TwoColumnLayout from 'src/layouts/TwoColumn'
import Entry from 'src/modules/transaction-builder/components/Entry/Entry'
import { Queue } from 'src/modules/transaction-builder/components/Queue'
import CreateProposalHeading from 'src/modules/transaction-builder/components/CreateProposalHeading'
import Transaction from 'src/modules/transaction-builder/components/Transaction'
import { Stack } from '@zoralabs/zord'
import { NextPageWithLayout } from 'src/pages/_app'
import { getDaoLayout } from 'src/layouts/DaoLayout/DaoLayout'

const CreateProposalPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router
  const { transaction } = query

  const leftColumn = (query: string | string[] | undefined) => {
    switch (query) {
      case 'custom':
        return (
          <Transaction
            helperText={`Add one or more transactions and describe your proposal for the community. 
            The proposal cannot modified after submission, so please verify all information before submitting.`}
          />
        )
    }
  }

  return (
    <Stack
      mt={'x24'}
      mb={'x20'}
      w={'100%'}
      px={'x3'}
      style={{ maxWidth: 1060 }}
      mx="auto"
    >
      <CreateProposalHeading title={'Create Proposal'} />
      {query.transaction ? (
        <TwoColumnLayout leftColumn={leftColumn(transaction)} rightColumn={<Queue />} />
      ) : (
        <TwoColumnLayout leftColumn={<Entry />} />
      )}
    </Stack>
  )
}

CreateProposalPage.getLayout = getDaoLayout

export default CreateProposalPage

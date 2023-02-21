import React from 'react'
import { useRouter } from 'next/router'
import TwoColumnLayout from 'src/layouts/TwoColumn'
import Entry from 'src/modules/transaction-builder/components/Entry/Entry'
import { Queue } from 'src/modules/transaction-builder/components/Queue/Queue'
import CreateProposalHeading from 'src/modules/transaction-builder/components/CreateProposalHeading'
import { Flex, Stack } from '@zoralabs/zord'
import { NextPageWithLayout } from 'src/pages/_app'
import { getDaoLayout } from 'src/layouts/DaoLayout/DaoLayout'
import {
  TRANSACTION_TYPE,
  TransactionType,
} from 'src/modules/transaction-builder/constants/transactionTypes'
import TransactionTypeIcon from 'src/modules/transaction-builder/components/TransactionTypeIcon'
import DropdownSelect from 'src/modules/transaction-builder/components/DropdownSelect'
import { SelectedTransactionForm } from 'src/modules/transaction-builder/components/SelectedTransactionForm'
import { useVotes } from 'src/hooks/useVotes'
import { useDaoStore } from 'src/stores'
import { useAccount } from 'wagmi'
import { AddressType } from 'src/typings'
import { notFoundWrap } from 'src/styles/404.css'

const CreateProposalPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { query, pathname } = router
  const { transaction } = query

  const { addresses } = useDaoStore()
  const { address } = useAccount()

  const { isLoading, hasThreshold } = useVotes({
    governorAddress: addresses?.governor,
    signerAddress: address,
    collectionAddress: query?.token as AddressType,
  })

  const createSelectOption = (type: TransactionType) => ({
    value: type,
    label: TRANSACTION_TYPE[type].title,
    icon: <TransactionTypeIcon transactionType={type} />,
  })

  const options = [
    TransactionType.SEND_ETH,
    TransactionType.AIRDROP,
    TransactionType.CUSTOM,
  ].map(createSelectOption)

  const handleDropdownOnChange = (value: string) => {
    router.push({
      pathname,
      query: { token: query.token, transaction: value },
    })
  }

  if (isLoading) return null

  if (!hasThreshold) {
    return <Flex className={notFoundWrap}>403 - Access Denied</Flex>
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
      {transaction ? (
        <TwoColumnLayout
          leftColumn={
            <Stack>
              <DropdownSelect
                value={transaction.toString()}
                options={options}
                onChange={(value) => handleDropdownOnChange(value)}
              />
              <SelectedTransactionForm type={transaction as TransactionType} />
            </Stack>
          }
          rightColumn={<Queue />}
        />
      ) : (
        <TwoColumnLayout leftColumn={<Entry />} />
      )}
    </Stack>
  )
}

CreateProposalPage.getLayout = getDaoLayout

export default CreateProposalPage

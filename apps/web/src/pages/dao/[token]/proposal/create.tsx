import React, { useState } from 'react'
import { useRouter } from 'next/router'
import TwoColumnLayout from 'src/layouts/TwoColumn'
import { Flex, Stack } from '@zoralabs/zord'
import { NextPageWithLayout } from 'src/pages/_app'
import { getDaoLayout } from 'src/layouts/DaoLayout/DaoLayout'
import { useVotes } from 'src/hooks'
import { useDaoStore } from 'src/modules/dao'
import { useAccount } from 'wagmi'
import { AddressType } from 'src/typings'
import { notFoundWrap } from 'src/styles/404.css'
import {
  SelectTransactionType,
  Queue,
  CreateProposalHeading,
  TransactionTypeIcon,
  DropdownSelect,
  TransactionForm,
  TRANSACTION_TYPES,
  TransactionType,
  TRANSACTION_FORM_OPTIONS,
} from 'src/modules/create-proposal'

const CreateProposalPage: NextPageWithLayout = () => {
  const router = useRouter()
  const { query } = router
  const [transactionType, setTransactionType] = useState<TransactionType | undefined>()

  const { addresses } = useDaoStore()
  const { address } = useAccount()

  const { isLoading, hasThreshold } = useVotes({
    governorAddress: addresses?.governor,
    signerAddress: address,
    collectionAddress: query?.token as AddressType,
  })

  const createSelectOption = (type: TransactionType) => ({
    value: type,
    label: TRANSACTION_TYPES[type].title,
    icon: <TransactionTypeIcon transactionType={type} />,
  })

  const options = TRANSACTION_FORM_OPTIONS.map(createSelectOption)

  const handleDropdownOnChange = (value: TransactionType) => {
    setTransactionType(value)
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
      {transactionType ? (
        <TwoColumnLayout
          leftColumn={
            <Stack>
              <DropdownSelect
                value={transactionType}
                options={options}
                onChange={(value) => handleDropdownOnChange(value)}
              />
              <TransactionForm type={transactionType} />
            </Stack>
          }
          rightColumn={<Queue />}
        />
      ) : (
        <TwoColumnLayout
          leftColumn={
            <SelectTransactionType
              transactionTypes={TRANSACTION_FORM_OPTIONS}
              onSelect={setTransactionType}
            />
          }
        />
      )}
    </Stack>
  )
}

CreateProposalPage.getLayout = getDaoLayout

export default CreateProposalPage

import { Flex, Stack, Text } from '@zoralabs/zord'
import React from 'react'

import { TransactionType } from 'src/modules/create-proposal'

import AdminNav from './AdminNav'
import { NounsConnect } from './NounsConnect'
import TransactionTypeCard from './TransactionTypeCard'

interface SelectTransactionTypeProps {
  transactionTypes: TransactionType[]
  onSelect: (value: TransactionType) => void
}

export const SelectTransactionType: React.FC<SelectTransactionTypeProps> = ({
  transactionTypes,
  onSelect,
}) => {
  return (
    <Stack style={{ maxWidth: 680, minHeight: '80vh' }} mx={'auto'}>
      <Text variant={'heading-xs'} mb={'x5'}>
        Select Transaction Type
      </Text>

      {transactionTypes.map((transactionType) => (
        <TransactionTypeCard
          key={transactionType}
          transactionType={transactionType}
          onClick={() => onSelect(transactionType)}
        />
      ))}
      <Flex
        borderWidth={'thin'}
        borderStyle={'solid'}
        borderColor={'ghostHover'}
        mt={'x4'}
        mb={'x4'}
      />
      <NounsConnect />
      <AdminNav />
    </Stack>
  )
}

import { Flex, Stack, Text } from '@zoralabs/zord'
import React from 'react'

import { TRANSACTION_TYPES, TransactionType } from '../../constants/transactionType'
import { TransactionTypeIcon } from '../TransactionTypeIcon'
import AdminNav from './AdminNav'
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
      <Flex gap={'x4'} align={'center'} cursor={'pointer'}>
        <TransactionTypeIcon transactionType={TransactionType.NOUNS_CONNECT} large />
        <Stack>
          <Text variant={'label-lg'} mb={'x1'}>
            {TRANSACTION_TYPES[TransactionType.NOUNS_CONNECT].title}
          </Text>
          <Text>{TRANSACTION_TYPES[TransactionType.NOUNS_CONNECT].subTitle}</Text>
        </Stack>
      </Flex>
      <AdminNav />
    </Stack>
  )
}

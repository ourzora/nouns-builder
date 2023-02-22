import React from 'react'
import { Stack, Text } from '@zoralabs/zord'
import { TransactionType } from '../../constants/transactionType'
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
      <Text fontWeight={'label'} fontSize={20} lineHeight={24} mb={'x5'}>
        Select Transaction Type
      </Text>

      {transactionTypes.map((transactionType) => (
        <TransactionTypeCard
          key={transactionType}
          transactionType={transactionType}
          onClick={() => onSelect(transactionType)}
        />
      ))}
      <AdminNav />
    </Stack>
  )
}

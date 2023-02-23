import React from 'react'
import { atoms, Flex, Stack, Text } from '@zoralabs/zord'
import { TRANSACTION_TYPES, TransactionType } from '../../constants'
import { TransactionTypeIcon } from '../TransactionTypeIcon'

interface TransactionTypeCardProps {
  transactionType: TransactionType
  onClick: () => void
}

const TransactionTypeCard: React.FC<TransactionTypeCardProps> = ({
  transactionType,
  onClick,
}) => {
  return (
    <Flex gap={'x4'} align={'center'} onClick={onClick}>
      <TransactionTypeIcon transactionType={transactionType} large />
      <Stack className={atoms({ lineHeight: 24 })}>
        <Text fontSize={18} fontWeight={'label'} style={{ marginBottom: '2px' }}>
          {TRANSACTION_TYPES[transactionType].title}
        </Text>
        <Text>{TRANSACTION_TYPES[transactionType].subTitle}</Text>
      </Stack>
    </Flex>
  )
}

export default TransactionTypeCard

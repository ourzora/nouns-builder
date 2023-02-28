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
      <Flex
        borderWidth={'thin'}
        borderStyle={'solid'}
        borderColor={'ghostHover'}
        mt={'x4'}
        mb={'x4'}
      />
      <a href={'https://www.nounsconnect.wtf/'} target={'_blank'}>
        <Flex gap={'x4'} align={'center'} cursor={'pointer'} mb={'x8'}>
          <TransactionTypeIcon
            transactionType={TransactionType.NOUNS_CONNECT}
            large
            border
          />
          <Stack>
            <Text variant={'label-lg'} mb={'x1'}>
              {TRANSACTION_TYPES[TransactionType.NOUNS_CONNECT].title}
            </Text>
            <Text style={{ lineHeight: '24px' }}>
              {TRANSACTION_TYPES[TransactionType.NOUNS_CONNECT].subTitle}
            </Text>
          </Stack>
        </Flex>
      </a>
      <AdminNav />
    </Stack>
  )
}

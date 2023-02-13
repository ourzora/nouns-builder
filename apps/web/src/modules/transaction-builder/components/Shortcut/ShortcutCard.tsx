import React from 'react'
import { atoms, Flex, Stack, Text } from '@zoralabs/zord'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { TRANSACTION_TYPE, TransactionType } from '../../constants/transactionTypes'
import TransactionTypeIcon from '../TransactionTypeIcon'

interface ShortcutCollectionProps {
  transactionType: TransactionType
  queryParam: string
}

const ShortcutCard: React.FC<ShortcutCollectionProps> = ({
  transactionType,
  queryParam,
}) => {
  const router = useRouter()
  const { pathname, query } = router

  return (
    <Link
      href={{
        pathname,
        query: {
          ...query,
          transaction: queryParam,
        },
      }}
    >
      <Flex gap={'x4'} align={'center'}>
        <TransactionTypeIcon transactionType={transactionType} large />
        <Stack className={atoms({ lineHeight: 24 })}>
          <Text fontSize={18} fontWeight={'label'} style={{ marginBottom: '2px' }}>
            {TRANSACTION_TYPE[transactionType].title}
          </Text>
          <Text>{TRANSACTION_TYPE[transactionType].subTitle}</Text>
        </Stack>
      </Flex>
    </Link>
  )
}

export default ShortcutCard

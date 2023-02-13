import React from 'react'
import { Flex } from '@zoralabs/zord'
import Link from 'next/link'

export const CreateDaoButton: React.FC = () => {
  return (
    <Link href="/create" passHref>
      <Flex
        as={'button'}
        id={'close-modal'}
        justify={'center'}
        w={'100%'}
        py={'x2'}
        backgroundColor={'primary'}
        fontSize={16}
        fontWeight={'display'}
        color={'onAccent'}
        cursor={'pointer'}
        style={{
          borderRadius: 8,
          border: 0,
          lineHeight: '24px',
        }}
      >
        Create a DAO
      </Flex>
    </Link>
  )
}

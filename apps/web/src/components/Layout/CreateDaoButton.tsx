import React from 'react'
import { Flex, Text } from '@zoralabs/zord'
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
        color={'onAccent'}
        cursor={'pointer'}
        style={{
          borderRadius: 8,
          border: 0,
        }}
      >
        <Text variant={'label-md'}>Create a DAO</Text>
      </Flex>
    </Link>
  )
}

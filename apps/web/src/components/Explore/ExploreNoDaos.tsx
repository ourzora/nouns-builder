import React from 'react'
import { Flex, Text } from '@zoralabs/zord'
import Link from 'next/link'

const ExploreNoDaos = () => {
  return (
    <Flex
      direction={'column'}
      align={'center'}
      style={{ maxWidth: 912, minHeight: 500, padding: '150px 0px' }}
      gap={'x4'}
    >
      <Text
        fontSize={16}
        color={'tertiary'}
        style={{ lineHeight: '24px', fontWeight: 400 }}
      >
        There are no DAOs here
      </Text>
      <Link href={'/create'} passHref>
        <Flex
          as="button"
          backgroundColor={'border'}
          borderRadius={'normal'}
          borderColor={'border'}
          borderStyle={'solid'}
          borderWidth={'normal'}
          px={'x4'}
          py={'x2'}
          mx={'x1'}
          fontSize={16}
          style={{
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          Create a DAO
        </Flex>
      </Link>
    </Flex>
  )
}

export default ExploreNoDaos

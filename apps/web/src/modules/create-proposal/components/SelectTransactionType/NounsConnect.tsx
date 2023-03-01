import { Flex, Stack, Text } from '@zoralabs/zord'
import React from 'react'

import { Icon } from 'src/components/Icon'

export const NounsConnect = () => {
  return (
    <Flex
      gap={'x4'}
      align={'center'}
      cursor={'pointer'}
      mb={'x8'}
      as={'a'}
      href={'https://www.nounsconnect.wtf/'}
      target={'_blank'}
    >
      <Flex
        align={'center'}
        justify={'center'}
        h={'x13'}
        w={'x13'}
        borderRadius={'round'}
        my={'x4'}
        minH={'x13'}
        minW={'x13'}
        borderWidth={'normal'}
        borderStyle={'solid'}
        borderColor={'ghostHover'}
        backgroundColor={'transparent'}
      >
        <Icon id={'nounsConnect'} fill={'transparent'} />
      </Flex>
      <Stack>
        <Text variant={'label-lg'} mb={'x1'}>
          Use NounsConnect
        </Text>
        <Text>
          Connect your DAO to create NFT collections, payment splits, transfer tokens and
          more
        </Text>
      </Stack>
    </Flex>
  )
}

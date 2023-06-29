import { Button, Flex, Stack, Text, mixins } from '@zoralabs/zord'
import Link from 'next/link'
import React, { ReactNode } from 'react'

import { useChainStore } from 'src/stores/useChainStore'
import { homeSectionHeader, homeSectionWrapper } from 'src/styles/home.css'

const RecentlyCreated: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const chain = useChainStore((x) => x.chain)
  return (
    <Stack
      w={'100%'}
      mx={'auto'}
      justify={'flex-start'}
      mt={{ '@initial': 'x16', '@768': 'x32' }}
      className={homeSectionWrapper}
    >
      <Text fontWeight={'label'} className={homeSectionHeader}>
        Recent DAOs on <span style={{ textDecoration: 'underline' }}>{chain.name}</span>
      </Text>
      {children}
      <Flex align={'center'} justify={'center'} mt={'x6'}>
        <Link href={'/explore'} passHref legacyBehavior>
          <Button
            as="a"
            borderRadius={'curved'}
            fontWeight={'display'}
            className={`${mixins({ hoverFadeOut: true })}`}
          >
            Explore All
          </Button>
        </Link>
      </Flex>
    </Stack>
  )
}

export default RecentlyCreated

import { Flex, Stack, Text, Button, mixins } from '@zoralabs/zord'
import React, { ReactNode } from 'react'
import { homeSectionHeader, homeSectionWrapper } from 'src/styles/home.css'
import Link from 'next/link'

const RecentlyCreated: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <Stack
      w={'100%'}
      mx={'auto'}
      justify={'flex-start'}
      mt={{ '@initial': 'x16', '@768': 'x32' }}
      className={homeSectionWrapper}
    >
      <Text fontWeight={'label'} className={homeSectionHeader}>
        Recent DAOs
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

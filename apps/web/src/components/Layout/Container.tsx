import React, { ReactNode } from 'react'
import { Flex, Box } from '@zoralabs/zord'
import { Navigation } from 'src/modules/proposals'

const Container = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <Flex width={'100%'} justify={'center'}>
      <Box width={'100%'} style={{ maxWidth: 680 }}>
        <Navigation />

        <Flex mt={'x8'} align={'center'}>
          <Box fontWeight={'display'} fontSize={28} mb={'x8'}>
            {title}
          </Box>
        </Flex>
        {children}
      </Box>
    </Flex>
  )
}

export default Container

import { Box, Flex, Text } from '@zoralabs/zord'
import React, { ReactNode } from 'react'

import { Meta } from 'src/components/Meta'

export const DashboardLayout = ({
  auctionCards,
  daoProposals,
}: {
  auctionCards: ReactNode
  daoProposals?: ReactNode
}) => {
  return (
    <DashPage>
      <Box mb={'x12'}>
        <Text fontSize={28} fontWeight={'display'} mb={'x6'}>
          DAOs
        </Text>
        {auctionCards}
      </Box>
      <Box>
        <Text fontSize={28} fontWeight={'display'} mb={'x6'}>
          Proposals
        </Text>
        {daoProposals}
      </Box>
    </DashPage>
  )
}

export const DashPage = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      minH={'100vh'}
      pt={{ '@initial': 'x8', '@480': 'x32' }}
      w={'100%'}
      justify="center"
    >
      <Meta title={'Dashboard'} type={'website'} slug={'/'} />
      <Box w="100%" style={{ maxWidth: 912 }}>
        <Text fontSize={35} fontWeight={'display'} mb={'x12'}>
          Dashboard
        </Text>
        {children}
      </Box>
    </Flex>
  )
}

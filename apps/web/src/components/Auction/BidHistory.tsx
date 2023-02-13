import AuctionAllBids from './AuctionAllBids'
import { Button, Flex } from '@zoralabs/zord'
import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { useBids } from 'src/hooks/useBids'

const AnimatedModal = dynamic(() => import('src/components/Modal/AnimatedModal'), {
  ssr: false,
})

export const BidHistory = ({ auctionAddress }: { auctionAddress: string }) => {
  const { query } = useRouter()

  const { data: bids } = useBids({
    auction: auctionAddress,
    tokenId: query?.tokenId as string,
  })

  return (
    <AnimatedModal
      trigger={
        <Button
          fontSize={18}
          width={'100%'}
          variant="secondary"
          borderRadius="curved"
          h="x14"
        >
          Bid history
        </Button>
      }
    >
      <AuctionAllBids bids={bids ?? []} />
    </AnimatedModal>
  )
}

export const ActionsWrapper = ({ children }: { children: ReactNode }) => (
  <Flex direction="column" align="center" mt={{ '@initial': 'x4', '@768': 'x6' }}>
    {children}
  </Flex>
)

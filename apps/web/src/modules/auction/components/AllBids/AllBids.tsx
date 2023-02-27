import { Box, Flex } from '@zoralabs/zord'
import React from 'react'
import { Bid, BidCard } from './BidCard'

interface AuctionAllBidsProps {
  bids: Bid[]
}

export const AllBids: React.FC<AuctionAllBidsProps> = ({ bids }) => {
  return (
    <Flex direction={'column'}>
      {bids.length > 0 ? (
        <>
          <Box fontSize={20} mb={'x2'}>
            Bid History
          </Box>

          <Flex pb="x4" direction="column" overflowY="auto" style={{ height: 200 }}>
            {bids.map((bid: Bid) => (
              <BidCard key={`${bid.bidder}_${bid.amount}_expanded`} bid={bid} />
            ))}
          </Flex>
        </>
      ) : (
        <Box fontSize={20}>No bids</Box>
      )}
    </Flex>
  )
}

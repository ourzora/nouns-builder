import React from 'react'
import { Box, Flex, Text, Stack } from '@zoralabs/zord'
import { useEnsData } from 'src/hooks/useEnsData'
import { Avatar } from '../Avatar'
import { Icon } from 'src/components/Icon'
import AuctionAllBids from './AuctionAllBids'
import { recentBid, recentBidder, allRecentBidsButton } from './Auction.css'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import dynamic from 'next/dynamic'
import { Bid } from 'src/typings'

const AnimatedModal = dynamic(() => import('src/components/Modal/AnimatedModal'), {
  ssr: false,
})

interface BidderProps {
  address: string
}

const Bidder: React.FC<BidderProps> = ({ address }) => {
  const { displayName, ensAvatar } = useEnsData(address)

  return (
    <Flex align="center">
      <Box mr="x2">
        <Avatar address={address} src={ensAvatar} size="32" />
      </Box>
      <Text className={recentBidder} variant="paragraph-md">
        {displayName}
      </Text>
    </Flex>
  )
}

interface RecentBidsProps {
  bids: Bid[]
}

export const RecentBids: React.FC<RecentBidsProps> = ({ bids }) => {
  return bids.length ? (
    <Box mt="x3">
      <Stack>
        {bids.slice(0, 3).map(({ amount, bidder, id, transactionHash }) => (
          <Flex
            align="center"
            py="x2"
            justify="space-between"
            key={`${bidder}_${amount}`}
            className={recentBid}
          >
            <Bidder address={bidder} />

            <Flex
              align="center"
              as="a"
              href={`${ETHERSCAN_BASE_URL}/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text mr="x2" variant="paragraph-md" color="tertiary">
                {amount} ETH
              </Text>
              <Icon id="external-16" fill="text4" size="sm" align={'center'} />
            </Flex>
          </Flex>
        ))}
        <Flex mt="x4" align="center" justify="center" className={recentBid}>
          <AnimatedModal
            trigger={
              <button type="button" className={allRecentBidsButton}>
                View All Bids
              </button>
            }
          >
            <AuctionAllBids bids={bids} />
          </AnimatedModal>
        </Flex>
      </Stack>
    </Box>
  ) : (
    <Flex mt="x5" align="center" justify="center">
      <Text variant="paragraph-lg" color="tertiary">
        No bids yet
      </Text>
    </Flex>
  )
}

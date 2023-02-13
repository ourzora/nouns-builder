import { Avatar } from '../Avatar'
import { Box, Flex, Text } from '@zoralabs/zord'
import React from 'react'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { useEnsData } from 'src/hooks/useEnsData'
import { formatCryptoVal } from 'src/utils/numbers'
import { Icon } from 'src/components/Icon'

interface Bid {
  id: string | number
  bidder: string
  amount: string
  transactionHash: string
}

interface AuctionAllBidsProps {
  bids: Bid[]
}

const BidCard = ({ bid }: { bid: Bid }) => {
  const { displayName, ensAvatar } = useEnsData(bid?.bidder)

  return (
    <Flex direction={'column'} my="x4" align="center" style={{ height: 35 }}>
      <Flex direction="row" width={'100%'} align="center" justify="space-between">
        <Flex direction="row" align="center">
          <Avatar address={bid.bidder} src={ensAvatar} size="28" />
          <Text mx="x2" variant="paragraph-md">
            {displayName}
          </Text>
        </Flex>
        <Flex direction="row" align="center">
          <Flex
            as="a"
            href={`${ETHERSCAN_BASE_URL}/tx/${bid.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text mr="x2" variant="paragraph-md">
              {formatCryptoVal(bid.amount)} ETH
            </Text>
            <Icon id="external-16" fill="text4" size="sm" align={'center'} />
          </Flex>
        </Flex>
      </Flex>
      <Box
        mt="x2"
        style={{
          borderBottom: '1px solid #B3B3B3',
          width: '100%',
          opacity: 0.5,
        }}
      />
    </Flex>
  )
}

const AuctionAllBids: React.FC<AuctionAllBidsProps> = ({ bids }) => {
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

export default AuctionAllBids

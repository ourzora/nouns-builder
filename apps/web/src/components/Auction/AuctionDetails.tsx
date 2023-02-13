import { Avatar } from '../Avatar'
import { auctionTextVariants } from './Auction.css'
import { Box, Flex } from '@zoralabs/zord'
import React, { ReactNode, useEffect } from 'react'
import { NULL_ADDRESS } from 'src/constants/addresses'
import { useEnsData } from 'src/hooks/useEnsData'
import { formatCryptoVal } from 'src/utils/numbers'
import { Icon } from 'src/components/Icon'
import { ETHERSCAN_BASE_URL } from 'src/constants/etherscan'
import { Countdown } from '../Countdown'

export const WinningBidder = ({ owner }: { owner?: string }) => {
  const { displayName, ensAvatar } = useEnsData(owner)

  return (
    <Detail title="Held by">
      {!owner || owner === NULL_ADDRESS ? (
        'n/a'
      ) : (
        <Flex direction={'row'} align={'center'}>
          <Avatar address={owner} src={ensAvatar} size={'24'} />
          <Box
            as="a"
            href={`${ETHERSCAN_BASE_URL}/address/${owner}`}
            rel={'noopener noreferrer'}
            target="_blank"
            ml={'x2'}
          >
            {displayName}
          </Box>
          <Icon ml="x1" fill="text4" id="arrowTopRight" />
        </Flex>
      )}
    </Detail>
  )
}

export const AuctionCountdown = ({
  endTime,
  onEnd,
}: {
  endTime: number
  onEnd: () => void
}) => {
  return (
    <Detail title="Auction ends in">
      <Countdown end={endTime} onEnd={onEnd} />
    </Detail>
  )
}

export const BidAmount = ({
  isOver,
  bid,
}: {
  isOver: boolean
  bid?: number | string
}) => (
  <Detail title={isOver ? 'Winning bid' : 'Current bid'}>
    {!!bid || (bid === 0 && !isOver) ? `${formatCryptoVal(bid)} ETH` : 'n/a'}
  </Detail>
)

const Detail = ({ title, children }: { title: string; children: ReactNode }) => (
  <Flex direction={'column'} style={{ flexBasis: '50%', flexGrow: 0 }}>
    <Box className={auctionTextVariants['tertiary']}>{title}</Box>
    <Box
      className={auctionTextVariants['secondary']}
      mt={{ '@initial': 'x1', '@768': 'x2' }}
    >
      {children}
    </Box>
  </Flex>
)

export const AuctionDetails = ({ children }: { children: ReactNode }) => {
  return (
    <Flex align={'center'} direction={'column'}>
      <Flex direction={'row'} width={'100%'} gap="x4">
        {children}
      </Flex>
    </Flex>
  )
}

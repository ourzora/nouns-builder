import dayjs from 'dayjs'
import { BigNumber, ethers } from 'ethers'
import React, { Fragment, useState } from 'react'

import { Bid } from 'src/data/contract/requests/getBids'
import { useTimeout } from 'src/hooks/useTimeout'

import { AuctionDetails } from '../AuctionDetails'
import { BidAmount } from '../BidAmount'
import { ActionsWrapper } from '../BidHistory'
import { WinningBidder } from '../WinningBidder'
import { AuctionCountdown } from './AuctionCountdown'
import { MemoizedPlaceBid } from './PlaceBid'
import { RecentBids } from './RecentBids'
import { Settle } from './Settle'

export const CurrentAuction = ({
  tokenId,
  bid,
  owner,
  endTime,
  bids,
}: {
  tokenId: string
  auctionAddress: string
  bid?: BigNumber
  owner?: string
  endTime?: number
  bids: Bid[]
}) => {
  const [isEnded, setIsEnded] = useState(false)
  const [isEnding, setIsEnding] = useState(false)

  const isEndingTimeout = isEnded ? 4000 : null

  useTimeout(() => {
    setIsEnding(false)
  }, isEndingTimeout)

  const onEnd = () => {
    setIsEnded(true)
    setIsEnding(true)
  }

  const isOver = !!endTime ? dayjs.unix(Date.now() / 1000) >= dayjs.unix(endTime) : true
  const formattedBid = bid ? ethers.utils.formatEther(bid) : ''

  if (isEnded || isOver) {
    return (
      <Fragment>
        <AuctionDetails>
          <BidAmount isOver bid={formattedBid} />
          <WinningBidder owner={owner} />
        </AuctionDetails>

        <ActionsWrapper>
          <Settle isEnding={isEnding} />
        </ActionsWrapper>
      </Fragment>
    )
  }

  return (
    <Fragment>
      <AuctionDetails>
        <BidAmount isOver={false} bid={formattedBid} />
        <AuctionCountdown endTime={endTime as number} onEnd={onEnd} />
      </AuctionDetails>

      <ActionsWrapper>
        <MemoizedPlaceBid tokenId={tokenId} highestBid={bid} />
      </ActionsWrapper>

      <RecentBids bids={bids} />
    </Fragment>
  )
}

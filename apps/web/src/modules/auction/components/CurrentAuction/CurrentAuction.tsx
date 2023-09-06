import dayjs from 'dayjs'
import { ethers } from 'ethers'
import React, { Fragment, useState } from 'react'

import { AuctionBidFragment } from 'src/data/subgraph/sdk.generated'
import { useTimeout } from 'src/hooks/useTimeout'
import { Chain } from 'src/typings'

import { AuctionDetails } from '../AuctionDetails'
import { BidAmount } from '../BidAmount'
import { ActionsWrapper } from '../BidHistory'
import { WinningBidder } from '../WinningBidder'
import { AuctionCountdown } from './AuctionCountdown'
import { MemoizedPlaceBid } from './PlaceBid'
import { RecentBids } from './RecentBids'
import { Settle } from './Settle'

export const CurrentAuction = ({
  chain,
  tokenId,
  bid,
  owner,
  endTime,
  bids,
}: {
  chain: Chain
  tokenId: string
  auctionAddress: string
  bid?: bigint
  owner?: string
  endTime?: number
  bids: AuctionBidFragment[]
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
          <Settle isEnding={isEnding} owner={owner} />
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
        <MemoizedPlaceBid chain={chain} tokenId={tokenId} highestBid={bid} />
      </ActionsWrapper>

      <RecentBids bids={bids} />
    </Fragment>
  )
}

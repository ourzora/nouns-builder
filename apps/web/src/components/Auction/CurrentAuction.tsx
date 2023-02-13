import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import { ActionsWrapper } from './BidHistory'
import {
  AuctionDetails,
  BidAmount,
  AuctionCountdown,
  WinningBidder,
} from './AuctionDetails'
import { Settle } from './Settle'
import { MemoizedPlaceBid } from './PlaceBid'
import dayjs from 'dayjs'
import { RecentBids } from './RecentBids'
import { BigNumber, ethers } from 'ethers'
import { useTimeout } from 'src/hooks/useTimeout'

export const CurrentAuction = ({
  auctionAddress,
  currentAuction,
  bid,
  owner,
  endTime,
}: {
  auctionAddress: string
  currentAuction?: number
  bid?: string
  owner?: string
  endTime?: number
}) => {
  const { query } = useRouter()
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
  const formattedBid = ethers.utils.formatEther(BigNumber.from(bid))

  if (isEnded || isOver) {
    return (
      <Fragment>
        <AuctionDetails>
          <BidAmount isOver bid={formattedBid} />
          <WinningBidder owner={owner} />
        </AuctionDetails>

        <ActionsWrapper>
          <Settle isEnding={isEnding} collectionAddress={query?.token as string} />
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
        <MemoizedPlaceBid
          collectionAddress={query?.token as string}
          currentAuction={currentAuction}
          highestBid={bid}
        />
      </ActionsWrapper>

      <RecentBids auctionAddress={auctionAddress} />
    </Fragment>
  )
}

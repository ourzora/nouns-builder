import * as Sentry from '@sentry/nextjs'

import { SDK } from 'src/data/subgraph/client'
import { CHAIN_ID } from 'src/typings'

import { Auction_OrderBy, OrderDirection } from '../sdk.generated'

export type AuctionHistory = {
  id: string
  endTime: number
  winningBidAmt: string
}

export const auctionHistoryRequest = async (
  chainId: CHAIN_ID,
  collectionAddress: string,
  startTime: number
): Promise<AuctionHistory[] | undefined> => {
  try {
    const data = await SDK.connect(chainId).auctionHistory({
      startTime,
      daoId: collectionAddress,
      orderDirection: OrderDirection.Asc,
      orderBy: Auction_OrderBy.EndTime,
      first: 1000,
    })

    return data.dao?.auctions
      .filter((auction) => auction.settled)
      .map((auction) => ({
        id: auction.id,
        endTime: Number(auction.endTime),
        winningBidAmt: auction?.winningBid?.amount as string,
      }))
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
  }
}

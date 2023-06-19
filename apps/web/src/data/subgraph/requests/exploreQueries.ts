import * as Sentry from '@sentry/nextjs'

import { sdk } from 'src/data/subgraph/client'

import {
  Auction_Filter,
  Auction_OrderBy,
  ExploreDaoFragment,
  OrderDirection,
} from '../sdk.generated'

export interface ExploreDaosResponse {
  daos: ExploreDaoFragment[]
}

export const userDaosFilter = async (memberAddress: string) => {
  const data = await sdk.daoTokenOwners({
    where: {
      owner: memberAddress,
    },
    first: 30,
  })

  const daos = data.daotokenOwners.map((x) => x.dao.tokenAddress)
  return sdk.myDaosPage({ daos })
}

export const exploreDaosRequest = async (
  skip: number,
  orderBy: Auction_OrderBy = Auction_OrderBy.StartTime
): Promise<ExploreDaosResponse | undefined> => {
  try {
    const orderDirection =
      orderBy === Auction_OrderBy.EndTime ? OrderDirection.Asc : OrderDirection.Desc

    const where: Auction_Filter = {
      settled: false,
    }

    if (orderBy === Auction_OrderBy.HighestBidAmount) where.bidCount_gt = 0
    if (orderBy === Auction_OrderBy.EndTime)
      where.endTime_gt = Math.floor(Date.now() / 1000)

    const data = await sdk.exploreDaosPage({
      orderBy,
      orderDirection,
      where,
      skip,
    })

    if (!data.auctions) return undefined
    return { daos: data.auctions }
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
    return undefined
  }
}

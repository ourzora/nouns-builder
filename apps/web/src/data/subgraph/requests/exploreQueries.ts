import * as Sentry from '@sentry/nextjs'

import { SDK } from 'src/data/subgraph/client'
import { CHAIN_ID } from 'src/typings'

import {
  Auction_Filter,
  Auction_OrderBy,
  ExploreDaoFragment,
  OrderDirection,
} from '../sdk.generated'

export interface ExploreDaosResponse {
  daos: ExploreDaoFragment[]
  hasNextPage: boolean
}

export const userDaosFilter = async (
  chainId: CHAIN_ID,
  memberAddress: string
): Promise<ExploreDaosResponse | undefined> => {
  const first = 30
  const userDaos = await SDK.connect(chainId).daoTokenOwners({
    where: {
      owner: memberAddress,
    },
    first,
  })

  const daoAddresses = userDaos.daotokenOwners.map((x) => x.dao.tokenAddress)
  const data = await SDK.connect(chainId).myDaosPage({ daos: daoAddresses })

  return { daos: data.auctions, hasNextPage: data.auctions.length === first }
}

export const exploreDaosRequest = async (
  chainId: CHAIN_ID,
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

    const first = 30

    const data = await SDK.connect(chainId).exploreDaosPage({
      orderBy,
      orderDirection,
      where,
      skip,
      first,
    })

    if (!data.auctions) return undefined
    return { daos: data.auctions, hasNextPage: data.auctions.length === first }
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
    return undefined
  }
}

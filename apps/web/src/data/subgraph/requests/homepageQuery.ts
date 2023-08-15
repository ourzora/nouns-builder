import * as Sentry from '@sentry/nextjs'

import { SDK } from 'src/data/subgraph/client'
import { DaoProps } from 'src/pages'
import { CHAIN_ID } from 'src/typings'

import { Auction_Filter } from '../sdk.generated'

export const highestBidsRequest = async (
  chainId: CHAIN_ID
): Promise<{
  data: DaoProps[]
  statusCode: number
}> => {
  let daos: DaoProps[] = []
  let statusCode = null

  try {
    const where: Auction_Filter = {
      bidCount_gt: 0,
      settled: false,
      endTime_gt: Math.floor(Date.now() / 1000),
    }

    // filter spam daos from L2
    if (
      chainId === CHAIN_ID.BASE ||
      chainId === CHAIN_ID.ZORA ||
      chainId === CHAIN_ID.OPTIMISM
    ) {
      const first = 30
      const activeDaos = await SDK.connect(chainId).activeDaos({
        first,
      })

      // If we have less than 30 active daos, we apply the filter
      if (activeDaos.daos.length !== first)
        where.dao_in = activeDaos.daos.map((x) => x.id)
    }

    const data = await SDK.connect(chainId).activeAuctions({
      first: 3,
      where,
    })
    daos = data?.auctions.map((auction) => auction.dao)
  } catch (e: any) {
    console.error(e)
    daos = []
    statusCode = e.response.status
    Sentry.captureException(e)
    await Sentry.flush(2000)
  }

  return { data: daos, statusCode }
}

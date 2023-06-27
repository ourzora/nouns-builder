import * as Sentry from '@sentry/nextjs'

import { SDK } from 'src/data/subgraph/client'
import { DaoProps } from 'src/pages'
import { Chain } from 'src/typings'

export const highestBidsRequest = async (
  chain: Chain
): Promise<{
  data: DaoProps[]
  statusCode: number
}> => {
  let daos: DaoProps[] = []
  let statusCode = null

  try {
    const data = await SDK.connect(chain.id).activeAuctions({
      endTime: Math.floor(Date.now() / 1000),
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

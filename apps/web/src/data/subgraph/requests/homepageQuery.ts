import * as Sentry from '@sentry/nextjs'

import { sdk } from 'src/data/subgraph/client'
import { DaoProps } from 'src/pages'

export const highestBidsRequest = async (): Promise<{
  data: DaoProps[]
  statusCode: number
}> => {
  let daos: DaoProps[] = []
  let statusCode = null

  try {
    const data = await sdk.activeAuctions({ endTime: Math.floor(Date.now() / 1000) })
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

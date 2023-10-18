import * as Sentry from '@sentry/nextjs'

import { SDK } from 'src/data/subgraph/client'
import { CHAIN_ID } from 'src/typings'

export const auctionBidRequest = async (bidId: string, chainId: CHAIN_ID) => {
  try {
    const data = await SDK.connect(chainId).auctionBid({ id: bidId })
    return data.auctionBid
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
  }
}

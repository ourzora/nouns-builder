import { formatEther } from 'viem'

import { CHAIN_ID } from 'src/typings'

import { SDK } from '../client'
import { AuctionBidFragment } from '../sdk.generated'

export const getBids = async (chainId: CHAIN_ID, collection: string, tokenId: string) => {
  return SDK.connect(chainId)
    .auctionBids({ id: `${collection.toLowerCase()}:${tokenId}` })
    .then((x) =>
      x.auction?.bids?.map((bid: AuctionBidFragment) => ({
        ...bid,
        amount: formatEther(bid.amount),
      }))
    )
}

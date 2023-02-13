import useSWR from 'swr'
import { readAuctionEvents } from 'src/utils/readAuctionContract'
import SWR_KEYS from 'src/constants/swrKeys'

interface Args {
  tokenId: string | number
  auction: string
}

export async function getBids(auction: string, tokenId: string | number) {
  try {
    const events = await readAuctionEvents(auction)

    return events
      ?.filter((event) => event.id === Number(tokenId))
      .sort((a, b) => (Number(a.amount) > Number(b.amount) ? -1 : 1))
  } catch (err) {
    console.log(err)
  }
}

export function useBids({ tokenId, auction }: Args) {
  return useSWR([SWR_KEYS.AUCTION_BIDS, auction, tokenId], () =>
    getBids(auction, tokenId)
  )
}

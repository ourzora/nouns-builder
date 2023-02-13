import { CHAIN } from 'src/constants/network'
import { sdk } from 'src/graphql/client'

export const tokenQuery = async (address: string, tokenId: string) => {
  if (!address) return

  const data = await sdk.token({ address, tokenId, chain: CHAIN })

  return {
    owner: data?.token?.token?.owner || null,
    name: data?.token?.token?.name || null,
    image: data?.token?.token?.image?.url || null,
    media: {
      ...data?.token?.token?.image?.mediaEncoding,
    },
    description: data?.token?.token?.description || null,
    mintDate: data?.token?.token?.mintInfo?.mintContext?.blockTimestamp || null,
  }
}

export const tokenWinnerQuery = async (address: string, tokenId: string) => {
  if (!address) return

  const data = await sdk.tokenWinner({ address, tokenId, chain: CHAIN })

  return {
    highestBidder: data?.nouns?.nounsMarkets?.nodes[0]?.highestBidder || null,
    price:
      data?.nouns?.nounsMarkets?.nodes[0]?.highestBidPrice?.chainTokenPrice?.decimal ||
      null,
  }
}

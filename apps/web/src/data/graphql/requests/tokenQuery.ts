import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { CHAIN } from 'src/constants/network'
import { sdk } from 'src/data/graphql/client'
import { ImageMediaEncodingFragment } from 'src/data/graphql/sdk'
import { Token, TokenWinner } from 'src/typings'

export const tokenQuery = async (
  address: string,
  tokenId: string
): Promise<Token | undefined> => {
  if (!address) return

  const data = await sdk.token({ address, tokenId, chain: CHAIN })

  const token = data?.token?.token

  if (!token) {
    return undefined
  }

  return {
    id: token.tokenId,
    ...omitBy(
      {
        owner: token.owner || undefined,
        name: token.name || undefined,
        description: token.description || undefined,
        image: token.image?.url || undefined,
        media: token.image?.mediaEncoding
          ? (token.image.mediaEncoding as ImageMediaEncodingFragment)
          : undefined,
        mintDate: token.mintInfo?.mintContext?.blockTimestamp || undefined,
      },
      isUndefined
    ),
  }
}

export const tokenWinnerQuery = async (
  address: string,
  tokenId: string
): Promise<TokenWinner> => {
  const data = await sdk.tokenWinner({ address, tokenId, chain: CHAIN })

  return omitBy(
    {
      highestBidder: data?.nouns?.nounsMarkets?.nodes[0]?.highestBidder || undefined,
      price:
        data?.nouns?.nounsMarkets?.nodes[0]?.highestBidPrice?.chainTokenPrice?.decimal ||
        undefined,
    },
    isUndefined
  )
}

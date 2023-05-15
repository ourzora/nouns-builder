import { CHAIN } from 'src/constants/network'
import { encodePageNumToEndCursor } from 'src/utils/encodePageNumToEndCursor'

import { sdk } from '../client'
import { SortDirection, TokenSortKey } from '../sdk.generated'

export interface TokensQueryResponse {
  tokens: {
    tokenId: string
    collection?: string
    image?: string
    name?: string
  }[]
  pageInfo: {
    endCursor?: string
    hasNextPage: boolean
  }
}

export const tokensQuery = async (
  owners: string[],
  collections: string[],
  page?: number
): Promise<TokensQueryResponse> => {
  const limit = 12
  const res = await sdk.tokens({
    where: {
      ownerAddresses: owners,
      collectionAddresses: collections,
    },
    chain: CHAIN,
    sort: { sortKey: TokenSortKey.Minted, sortDirection: SortDirection.Desc },
    pagination: {
      limit,
      after: !!page ? encodePageNumToEndCursor(limit, page.toString()) : undefined,
    },
  })

  const tokens = res.tokens.nodes.map((x) => ({
    image: x.token.image?.url || undefined,
    name: x.token.name || undefined,
    tokenId: x.token.tokenId,
    collection: x.token.tokenContract?.collectionAddress,
  }))

  const endCursor = res.tokens.pageInfo.endCursor || undefined
  const hasNextPage = res.tokens.pageInfo.hasNextPage

  return {
    tokens,
    pageInfo: {
      endCursor,
      hasNextPage,
    },
  }
}

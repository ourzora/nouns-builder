import { CHAIN } from 'src/constants/network'
import { encodePageNumToEndCursor } from 'src/utils/encodePageNumToEndCursor'

import { sdk } from '../client'
import {
  PageInfoFragment,
  SortDirection,
  TokenFragment,
  TokenSortKey,
} from '../sdk.generated'

export interface TokensQueryResponse {
  tokens: TokenFragment[]
  pageInfo: PageInfoFragment
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

  return {
    tokens: res.tokens.nodes.map((x) => x.token),
    pageInfo: res.tokens.pageInfo,
  }
}

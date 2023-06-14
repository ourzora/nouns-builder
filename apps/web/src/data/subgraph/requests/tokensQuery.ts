import { sdk } from '../client'
import { OrderDirection, TokenFragment, Token_OrderBy } from '../sdk.generated'

export interface TokensQueryResponse {
  tokens: TokenFragment[]
}

export const tokensQuery = async (
  owner: string,
  page?: number
): Promise<TokensQueryResponse> => {
  const limit = 12
  const res = await sdk.tokens({
    where: {
      owner: owner.toLowerCase(),
    },
    orderBy: Token_OrderBy.MintedAt,
    orderDirection: OrderDirection.Desc,
    skip: page ? (page - 1) * limit : undefined,
  })

  return {
    tokens: res.tokens,
  }
}

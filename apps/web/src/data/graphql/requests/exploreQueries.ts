import * as Sentry from '@sentry/nextjs'
import { ExplorePageData, MarketSortKey } from 'src/typings'

import { sdk } from 'src/data/graphql/client'

import { CHAIN } from 'src/constants/network'

export const userDaosFilter = async (
  after: string | null,
  address: string,
  sortKey?: MarketSortKey
): Promise<ExplorePageData | undefined> => {
  if (!address) return

  try {
    const data = await sdk.myDaosPage({
      address: address,
      chain: CHAIN,
    })

    const daos = data?.nouns?.nounsDaos?.nodes.map((dao: any) => {
      return dao.collectionAddress
    })

    if (!daos.length) {
      return undefined
    }

    const res = await exploreDaosRequest(after, daos, sortKey)

    return res
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
    return undefined
  }
}

export type TokenInput = {
  tokenId: string
  address: string
}[]

export type TokensResponse = {
  [key: string]: {
    collectionAddress: string | null
    collectionName: string | null
    name: string | null
    image: string | null
  }
}

export const tokensRequest = async (
  tokenInput: TokenInput
): Promise<TokensResponse | undefined> => {
  try {
    const data = await sdk.exploreTokens({
      chain: CHAIN,
      tokens: tokenInput,
    })

    const tokens: TokensResponse = data?.tokens?.nodes
      .map((token: any) => {
        return {
          collectionAddress: token.token.collectionAddress || null,
          collectionName: token.token.collectionName || null,
          name: token.token.name || null,
          image: token.token.image?.url || null,
        }
      })
      .reduce((acc: any, curr: any) => {
        acc[curr.collectionAddress] = {
          collectionAddress: curr.collectionAddress,
          collectionName: curr.collectionName,
          name: curr.name,
          image: curr.image,
        }
        return acc
      }, {})

    return tokens
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
    return undefined
  }
}

export const exploreDaosRequest = async (
  after: string | null,
  collectionAddresses: string[] = [],
  sortKey: MarketSortKey = MarketSortKey.Created
): Promise<ExplorePageData | undefined> => {
  try {
    const data = await sdk.exploreDaosPage({
      chain: CHAIN,
      after,
      sortKey: sortKey,
      collectionAddresses,
    })

    // constructs an array of objects using the collectionAddress as the keys
    const daos = data?.nouns?.nounsMarkets?.nodes.reduce((acc: any, curr: any) => {
      acc[curr.collectionAddress] = {
        tokenId: curr.tokenId || null,
        highestBidder: curr.highestBidder || null,
        highestBidPrice: curr.highestBidPrice?.chainTokenPrice?.decimal || null,
        endTime: curr.endTime || null,
        collectionAddress: curr.collectionAddress || null,
      }
      return acc
    }, {})

    // constructs the TokenInput argument that we pass to tokensRequest
    // { address: String!, tokenId: String! }[]
    const tokenInput: TokenInput = data?.nouns?.nounsMarkets?.nodes.map(
      (dao: { tokenId: string; collectionAddress: string }) => {
        return {
          address: dao.collectionAddress,
          tokenId: dao.tokenId,
        }
      }
    )

    const tokens = await tokensRequest(tokenInput)
    if (!tokens) return undefined

    // appends the token data to the daos object
    const daosWithTokens = Object.keys(daos).reduce((acc: any, curr: any) => {
      acc[curr] = {
        ...daos[curr],
        ...tokens[curr],
      }
      return acc
    }, {})

    const daosArray: ExplorePageData['daos'] = Object.values(daosWithTokens)

    return { daos: daosArray, pageInfo: data?.nouns?.nounsMarkets?.pageInfo }
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
    return undefined
  }
}

import * as Sentry from '@sentry/nextjs'

import { sdk } from 'src/data/graphql/client'

import { CHAIN } from 'src/constants/network'

export const getTokenOwners = async (token: [string]) => {
  if (token === null || token === undefined) return

  try {
    const data = await sdk.tokenOwners({ token, chain: CHAIN })
    return data?.aggregateStat?.ownersByCount?.nodes
  } catch (e) {
    Sentry.captureException(e)
    await Sentry.flush(2000)
    return []
  }
}

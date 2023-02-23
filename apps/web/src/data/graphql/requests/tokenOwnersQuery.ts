import * as Sentry from '@sentry/nextjs'
import { CHAIN } from 'src/constants/network'
import { sdk } from 'src/data/graphql/client'

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

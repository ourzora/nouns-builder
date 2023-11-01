import * as Sentry from '@sentry/nextjs'

import { CHAIN_ID } from 'src/typings'

import { SDK } from '../client'

export const getMetadataHashes = async (chainId: CHAIN_ID, tokenAddress: string) => {
  try {
    return SDK.connect(chainId)
      .daoMetadataHashes({ tokenAddress: `${tokenAddress.toLowerCase()}` })
      .then((x) => x.dao?.metadataUpdateHashes)
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
    return undefined
  }
}

import { CHAIN } from 'src/constants/network'
import { sdk } from 'src/data/graphql/client'
import * as Sentry from '@sentry/nextjs'

export const salesVolumeRequest = async (
  collectionAddress: string
): Promise<number | undefined> => {
  if (collectionAddress === undefined) return

  try {
    const data = await sdk.salesVolume({
      chain: CHAIN,
      collectionAddress: collectionAddress,
    })

    return data.aggregateStat.salesVolume.chainTokenPrice
  } catch (e) {
    console.error(e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
  }
}

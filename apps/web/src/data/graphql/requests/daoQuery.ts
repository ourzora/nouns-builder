import * as Sentry from '@sentry/nextjs'
import { CHAIN } from 'src/constants/network'
import { sdk } from 'src/data/graphql/client'

export type MyDaosResponse = Array<{
  name: string
  collectionAddress: string
  auctionAddress: string
}>

const DAOS_TO_EXCLUDE = [
  '0x9c8ff314c9bc7f6e59a9d9225fb22946427edc03',
  '0x4b10701bfd7bfedc47d50562b76b436fbb5bdb3b',
]

export const myDaosRequest = async (
  memberAddress: [string]
): Promise<MyDaosResponse | undefined> => {
  let addresses: string[] = []
  let daos: MyDaosResponse = []

  if (!memberAddress) return

  try {
    const data = await sdk.activeAuctions({ chain: CHAIN })
    addresses = data?.nouns?.nounsMarkets?.nodes
      .filter((dao) => !DAOS_TO_EXCLUDE.includes(dao.collectionAddress))
      .slice(0, 3)
      .map((dao) => dao.collectionAddress)
  } catch (e: any) {
    console.error(e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
  }

  try {
    const data = await sdk.daos({
      where: {
        memberAddresses: memberAddress,
      },
      chain: CHAIN,
      pagination: { limit: 25 },
    })

    return data.nouns.nounsDaos.nodes
      .filter((dao) => !DAOS_TO_EXCLUDE.includes(dao.collectionAddress))
      .map((dao) => ({
        name: dao.name || '',
        collectionAddress: dao.collectionAddress,
        auctionAddress: dao?.auctionAddress || '',
      }))
  } catch (e: any) {
    console.error(e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
  }

  return daos
}

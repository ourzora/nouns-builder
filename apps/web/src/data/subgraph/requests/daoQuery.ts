import * as Sentry from '@sentry/nextjs'

import { sdk } from 'src/data/subgraph/client'

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
  memberAddress: string
): Promise<MyDaosResponse | undefined> => {
  let daos: MyDaosResponse = []

  if (!memberAddress) return

  try {
    const data = await sdk.daoTokenOwners({
      where: {
        owner: memberAddress,
      },
      first: 25,
    })

    return data.daotokenOwners
      .map((x) => {
        return x.dao
      })
      .filter((dao) => !DAOS_TO_EXCLUDE.includes(dao.tokenAddress))
      .map((dao) => ({
        name: dao.name || '',
        collectionAddress: dao.tokenAddress,
        auctionAddress: dao?.auctionAddress || '',
      }))
  } catch (e: any) {
    console.error(e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
  }

  return daos
}

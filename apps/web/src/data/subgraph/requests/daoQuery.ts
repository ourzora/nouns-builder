import * as Sentry from '@sentry/nextjs'

import { DAOS_TO_EXCLUDE } from 'src/constants/addresses'
import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { SDK } from 'src/data/subgraph/client'
import { CHAIN_ID } from 'src/typings'

export type MyDaosResponse = Array<{
  name: string
  collectionAddress: string
  auctionAddress: string
  chainId: CHAIN_ID
}>

export const myDaosRequest = async (
  memberAddress: string
): Promise<MyDaosResponse | undefined> => {
  let daos: MyDaosResponse = []

  if (!memberAddress) throw new Error('No user address provided')

  try {
    const data = await Promise.all(
      PUBLIC_DEFAULT_CHAINS.map((chain) =>
        SDK.connect(chain.id)
          .daoTokenOwners({
            where: {
              owner: memberAddress,
            },
            first: 30,
          })
          .then((x) => ({ ...x, chainId: chain.id }))
      )
    )

    return data
      .map((queries) =>
        queries.daotokenOwners
          .map((x) => {
            return x.dao
          })
          .filter((dao) => !DAOS_TO_EXCLUDE.includes(dao.tokenAddress))
          .map((dao) => ({
            name: dao.name || '',
            collectionAddress: dao.tokenAddress,
            auctionAddress: dao?.auctionAddress || '',
            chainId: queries.chainId,
          }))
      )
      .flat()
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch (e: any) {
    console.error(e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
  }

  return daos
}

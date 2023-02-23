import * as Sentry from '@sentry/nextjs'
import { CHAIN } from 'src/constants/network'
import { sdk } from 'src/data/graphql/client'
import { DaoProps } from 'src/pages'

const brokenImgs = [
  '0xd38f7041d04ecb99404476d79420948158f1e7ad',
  '0xa545bf2f67944c81dfc7dcf8ad059cd4540c03de',
  '0x567c3cc159b694f4a4ed6545a86eb4fd5c5169fd',
] //TODO: to be removed

export const highestBidsRequest = async (): Promise<{
  data: DaoProps[]
  statusCode: number
}> => {
  let addresses: string[] = []
  let daos: DaoProps[] = []
  let statusCode = null

  try {
    const data = await sdk.activeAuctions({ chain: CHAIN })
    addresses = data?.nouns?.nounsMarkets?.nodes
      .filter((dao) => !brokenImgs.includes(dao.collectionAddress))
      .slice(0, 3)
      .map((dao) => dao.collectionAddress)
  } catch (e: any) {
    console.error(e)
    daos = []
    statusCode = e.response.status
    Sentry.captureException(e)
    await Sentry.flush(2000)
  }

  try {
    const data = await sdk.daos({
      where: { collectionAddresses: addresses },
      pagination: { limit: addresses.length },
      chain: CHAIN,
    })

    daos = data?.nouns?.nounsDaos?.nodes?.map((dao) => ({
      collectionAddress: dao?.collectionAddress || '',
      name: dao?.name || '',
      auctionAddress: dao?.auctionAddress || '',
    }))
  } catch (e: any) {
    console.error(e)
    daos = []
    statusCode = e.response.status
    Sentry.captureException(e)
    await Sentry.flush(2000)
  }

  return { data: daos, statusCode }
}

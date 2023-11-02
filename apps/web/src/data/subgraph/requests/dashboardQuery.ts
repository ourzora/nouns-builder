import * as Sentry from '@sentry/nextjs'

import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { SDK } from 'src/data/subgraph/client'

export const dashboardRequest = async (memberAddress: string) => {
  try {
    if (!memberAddress) throw new Error('No user address provided')
    const data = await Promise.all(
      PUBLIC_DEFAULT_CHAINS.map((chain) =>
        SDK.connect(chain.id)
          .dashboard({
            where: {
              owner: memberAddress.toLowerCase(),
            },
            first: 30,
          })
          .then((x) => ({ ...x, chainId: chain.id }))
      )
    )

    return data
      .map((queries) =>
        queries.daotokenOwners.map(({ dao }) => ({
          ...dao,
          name: dao.name || '',
          tokenAddress: dao.tokenAddress,
          auctionAddress: dao?.auctionAddress || '',
          proposals: dao.proposals,
          currentAuction: dao.currentAuction,
          chainId: queries.chainId,
          daoImage: dao.contractImage,
        }))
      )
      .flat()
      .sort((a, b) => a.name.localeCompare(b.name))
  } catch (e: any) {
    console.error(e)
    Sentry.captureException(e)
    await Sentry.flush(2000)
    throw new Error(
      e?.message
        ? `Goldsky Request Error: ${e.message}`
        : 'Error fetching dashboard data from Goldsky subgraph.'
    )
  }
}

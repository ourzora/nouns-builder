import * as Sentry from '@sentry/nextjs'

import { SDK } from 'src/data/subgraph/client'
import { CHAIN_ID } from 'src/typings'

import { DaoTokenOwner_OrderBy, OrderDirection } from '../sdk.generated'

export type DaoMember = {
  address: string
  tokens: number[]
}

export const memberSnapshotRequest = async (
  chainId: CHAIN_ID,
  collectionAddress: string
): Promise<DaoMember[] | undefined> => {
  try {
    const data = await SDK.connect(chainId).daoMembersList({
      where: {
        dao: collectionAddress,
      },
      first: 1000,
      skip: 0,
      orderBy: DaoTokenOwner_OrderBy.DaoTokenCount,
      orderDirection: OrderDirection.Desc,
    })

    if (!data.daotokenOwners) return undefined
    return data.daotokenOwners.map((member) => ({
      address: member.owner,
      tokens: member.daoTokens.map((token) => token.tokenId),
    }))
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
  }
}

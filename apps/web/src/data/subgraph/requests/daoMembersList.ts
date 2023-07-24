import * as Sentry from '@sentry/nextjs'

import { SDK } from 'src/data/subgraph/client'
import { CHAIN_ID } from 'src/typings'

import { DaoTokenOwner_OrderBy, OrderDirection } from '../sdk.generated'

export type DaoMember = {
  address: string
  daoTokenCount: number
  timeJoined: number
}

export const membersListRequest = async (
  chainId: CHAIN_ID,
  collectionAddress: string,
  page?: number,
  limit = 10
): Promise<DaoMember[] | undefined> => {
  try {
    const data = await SDK.connect(chainId).daoMembersList({
      where: {
        dao: collectionAddress,
      },
      first: limit,
      skip: page ? (page - 1) * limit : 0,
      orderBy: DaoTokenOwner_OrderBy.DaoTokenCount,
      orderDirection: OrderDirection.Desc,
    })

    if (!data.daotokenOwners) return undefined
    return data.daotokenOwners.map((member) => ({
      address: member.owner,
      daoTokenCount: member.daoTokenCount,
      timeJoined: member.daoTokens
        .map((daoToken) => Number(daoToken.mintedAt))
        .sort((a, b) => a - b)[0],
    }))
  } catch (error) {
    console.error(error)
    Sentry.captureException(error)
    await Sentry.flush(2000)
  }
}

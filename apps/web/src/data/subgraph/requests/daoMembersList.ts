import * as Sentry from '@sentry/nextjs'

import { SDK } from 'src/data/subgraph/client'
import { CHAIN_ID } from 'src/typings'

import { DaoTokenOwner_OrderBy, OrderDirection } from '../sdk.generated'

interface DaoMember {
  id: string
  daoTokenCount: number
  timeJoined: number
}

export const membersListRequest = async (
  chainId: CHAIN_ID,
  collectionAddress: string
): Promise<DaoMember[] | undefined> => {
  try {
    const data = await SDK.connect(chainId).daoMembersList({
      where: {
        dao: collectionAddress,
      },
      first: 10,
      orderBy: DaoTokenOwner_OrderBy.DaoTokenCount,
      orderDirection: OrderDirection.Desc,
    })

    if (!data.daotokenOwners) return undefined
    return data.daotokenOwners.map((member) => ({
      id: member.id.split(':')[1],
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

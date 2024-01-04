import { SDK } from 'src/data/subgraph/client'
import { applyL1ToL2Alias } from 'src/modules/create-proposal/utils/applyL1ToL2Alias'
import { CHAIN_ID } from 'src/typings'

import { DaoTokenOwner_OrderBy, OrderDirection } from '../sdk.generated'

export type DaoMember = {
  address: string
  tokens: number[]
}

export const memberSnapshotRequest = async (
  chainId: CHAIN_ID,
  collectionAddress: string
): Promise<DaoMember[]> => {
  const data = await SDK.connect(chainId).daoMembersList({
    where: {
      dao: collectionAddress,
    },
    orderBy: DaoTokenOwner_OrderBy.DaoTokenCount,
    orderDirection: OrderDirection.Desc,
  })

  if (!data.daotokenOwners) throw new Error('No token owner found')

  const formattedMembers = await Promise.all(
    data.daotokenOwners.map(async (member) => {
      let tokenOwner = await applyL1ToL2Alias(chainId, member.owner)

      return {
        address: tokenOwner,
        tokens: member.daoTokens.map((token) => token.tokenId),
      }
    })
  )

  return formattedMembers
}

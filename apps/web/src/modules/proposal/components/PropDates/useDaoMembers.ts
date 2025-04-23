import { getAddress } from 'viem'
import { useQuery } from 'wagmi'

import {
  type DaoMember,
  memberSnapshotRequest,
} from 'src/data/subgraph/requests/memberSnapshot'

export const useDaoMembers = (chainId: number, token: string) => {
  const { data: members } = useQuery<DaoMember[], Error>(
    ['members', chainId, token],
    () => memberSnapshotRequest(chainId, token),
    {
      enabled: !!token,
    }
  )

  if (!members) {
    return []
  }

  return members.map(({ address }) => getAddress(address))
}

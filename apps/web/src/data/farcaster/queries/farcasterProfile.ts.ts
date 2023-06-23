import { err } from 'neverthrow'

import { farcasterClient } from '../client'

export const getFarcasterProfile = async (fid: number) => {
  const client = farcasterClient()

  const pfpRes = await client.getUserData({ fid, userDataType: 1 })
  const nameRes = await client.getUserData({ fid, userDataType: 2 })

  client.close()
  if (nameRes.isErr()) return err(nameRes.error)
  if (pfpRes.isErr()) return err(pfpRes.error)

  return {
    displayName: nameRes.value.data?.userDataBody?.value as string | undefined,
    pfp: pfpRes.value.data?.userDataBody?.value as string | undefined,
  }
}

import { UserDataType } from '@farcaster/hub-nodejs'
import { err } from 'neverthrow'

import { farcasterClient } from '../client'

export const getFarcasterProfile = async (fid: number) => {
  const client = farcasterClient()

  const pfpRes = await client.getUserData({ fid, userDataType: UserDataType.PFP })
  const nameRes = await client.getUserData({ fid, userDataType: UserDataType.DISPLAY })
  const fName = await client.getUserData({ fid, userDataType: UserDataType.FNAME })

  client.close()
  if (nameRes.isErr()) return err(nameRes.error)
  if (pfpRes.isErr()) return err(pfpRes.error)
  if (fName.isErr()) return err(fName.error)

  return {
    displayName: nameRes.value.data?.userDataBody?.value as string | undefined,
    pfp: pfpRes.value.data?.userDataBody?.value as string | undefined,
    fName: fName.value.data?.userDataBody?.value as string | undefined,
  }
}

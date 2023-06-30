import { UserDataType } from '@farcaster/hub-nodejs'

import { farcasterClient } from '../client'

export const getFarcasterProfile = async (fid: number) => {
  const client = farcasterClient()

  const pfpRes = await client.getUserData({ fid, userDataType: UserDataType.PFP })
  const nameRes = await client.getUserData({ fid, userDataType: UserDataType.DISPLAY })
  const fName = await client.getUserData({ fid, userDataType: UserDataType.FNAME })

  client.close()

  if (nameRes.isErr()) throw new Error(nameRes.error.message)
  if (pfpRes.isErr()) throw new Error(pfpRes.error.message)
  if (fName.isErr()) throw new Error(fName.error.message)

  return {
    displayName: nameRes.value.data?.userDataBody?.value as string | undefined,
    pfp: pfpRes.value.data?.userDataBody?.value as string | undefined,
    fName: fName.value.data?.userDataBody?.value as string | undefined,
  }
}

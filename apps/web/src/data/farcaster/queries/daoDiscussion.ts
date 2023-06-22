import { isCastAddMessage } from '@farcaster/hub-nodejs'
import { err, ok } from 'neverthrow'

import { PURPLE_COLLECTION } from 'src/constants/farcasterHub'

import { farcasterClient } from '../client'

const createChannelString = (collectionAddress: string, chainId: string) => {
  return `chain://eip155:${chainId}/erc721:${collectionAddress}`
}

export const getDAOfeed = async (
  collectionAddress: string,
  chainId: string,
  testActiveChannel = false
) => {
  const client = farcasterClient()

  const res = await client.getCastsByParent({
    parentUrl: testActiveChannel
      ? createChannelString(PURPLE_COLLECTION, '1')
      : createChannelString(collectionAddress, chainId),
  })

  if (res.isErr()) {
    return err(res.error)
  }
  // Coerce Messages into Casts, should not actually filter out any messages
  const casts = res.value.messages.filter(isCastAddMessage)

  return ok(casts.filter((msg) => !msg.data.castAddBody.parentCastId))
}

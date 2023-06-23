import { CastAddMessage, HubError, isCastAddMessage } from '@farcaster/hub-nodejs'
import { Err, Ok, err, ok } from 'neverthrow'

import { farcasterClient } from '../client'

const createChannelString = (collectionAddress: string, chainId: string) => {
  return `chain://eip155:${chainId}/erc721:${collectionAddress}`
}

export const getDAOfeed = async (
  feedId: string
): Promise<Ok<CastAddMessage[], never> | Err<HubError, HubError>> => {
  const client = farcasterClient()

  const [collectionAddress, chainId] = feedId.split('_')

  const res = await client.getCastsByParent({
    parentUrl: createChannelString(collectionAddress, chainId),
  })

  if (res.isErr()) {
    return err(res.error)
  }
  // Coerce Messages into Casts, should not actually filter out any messages
  const casts = res.value.messages.filter(isCastAddMessage)

  return ok(casts.filter((msg) => !msg.data.castAddBody.parentCastId))
}

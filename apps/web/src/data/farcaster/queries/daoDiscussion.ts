import { hexStringToBytes, isCastAddMessage } from '@farcaster/hub-nodejs'
import { err, ok } from 'neverthrow'

import { farcasterClient } from '../client'

const createChannelString = (collectionAddress: string, chainId: string) => {
  return `chain://eip155:${chainId}/erc721:${collectionAddress}`
}

export const getDAOfeed = async (feedId: string) => {
  const client = farcasterClient()

  const [collectionAddress, chainId, nextToken] = feedId.split('~')

  const nextBufferArray =
    nextToken?.slice(0, 2) === '0x'
      ? hexStringToBytes(nextToken)._unsafeUnwrap()
      : undefined

  const res = await client.getCastsByParent({
    parentUrl: createChannelString(collectionAddress, chainId),
    reverse: true,
    pageSize: 10,
    pageToken: nextBufferArray,
  })

  client.close()
  if (res.isErr()) {
    return err(res.error)
  }
  // Coerce Messages into Casts, should not actually filter out any messages
  const casts = res.value.messages.filter(isCastAddMessage)

  return ok({
    data: casts.filter((msg) => !msg.data.castAddBody.parentCastId),
    nextPageToken: res.value.nextPageToken,
  })
}

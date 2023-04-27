import { CHAIN } from 'src/constants/network'

import { sdk } from '../client'

export type AuctionSettledResponse = Array<{
  tokenId: string
  collectionAddress: string
}>

export const auctionSettledRequest = async (
  addresses: string[],
  endDate: number,
  limit: number
): Promise<AuctionSettledResponse> => {
  const data = await sdk.auctionSettled({
    chain: CHAIN,
    auctionAddresses: addresses,
    endDatetime: endDate * 1000,
    limit,
  })

  return data.nouns.nounsEvents.nodes.map((x) => {
    if (!('properties' in x.properties)) throw new Error('Invalid response')
    const props = x.properties.properties

    if (!('tokenId' in props)) throw new Error('Invalid response')
    return { tokenId: props.tokenId, collectionAddress: x.properties.collectionAddress }
  })
}

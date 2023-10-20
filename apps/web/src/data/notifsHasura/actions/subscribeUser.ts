import { isAddress } from 'viem'

import { AddressType, CHAIN_ID } from 'src/typings'
import { EventType } from 'src/typings/pushWebhookTypes'
import { isValidNetworkId } from 'src/utils/helpers'
import { createEventId } from 'src/utils/pushWebhook'

export const subscribeUser = async (
  userAddress: AddressType,
  collectionAddress: AddressType,
  chainId: CHAIN_ID,
  eventType: EventType
) => {
  try {
    // extra validation to ensure correct data is passed
    if (!isAddress(userAddress)) throw new Error('invalid user address')
    if (!isAddress(collectionAddress)) throw new Error('invalid collection address')
    if (!EventType[eventType]) throw new Error('invalid event type')
    if (!isValidNetworkId(chainId)) throw new Error('invalid network id')

    const eventId = createEventId(collectionAddress, chainId, eventType)
  } catch (error) {}
  // check if event exists
  // if yes, skip
  // if no, batch addUser call
  // check if user exists
  // if yes, skip
  // if no, batch addEvent call
  // chack if user is subscribed to event
  // if yes, return error('a'ready subscribed')
  // if no, batch addEventUser call
}

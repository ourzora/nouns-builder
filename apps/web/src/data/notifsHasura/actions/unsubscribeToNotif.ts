import { AddressType, CHAIN_ID } from 'src/typings'
import { NotificationType } from 'src/typings/pushWebhookTypes'
import { createHasuraClient } from 'src/utils/hasura'
import { createEventId } from 'src/utils/pushWebhook'

import { removeEventUserMutation } from '../gql/mutations'

export const unsubscribeToNotif = async (
  _userAddress: AddressType,
  _collectionAddress: AddressType,
  chainId: CHAIN_ID,
  eventType: NotificationType
) => {
  try {
    const userAddress = _userAddress.toLowerCase() as AddressType
    const collectionAddress = _collectionAddress.toLowerCase() as AddressType
    const eventId = createEventId(collectionAddress, chainId, eventType)

    const client = createHasuraClient()

    return await client.request(removeEventUserMutation, { eventId, userAddress })
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}

import { isAddress } from 'viem'

import { AddressType, CHAIN_ID } from 'src/typings'
import { NotificationType } from 'src/typings/pushWebhookTypes'
import { createHasuraClient } from 'src/utils/hasura'
import { isValidNetworkId } from 'src/utils/helpers'
import { createEventId } from 'src/utils/pushWebhook'

import { addEventMutation, addEventUserMutation, addUserMutation } from '../gql/mutations'
import { getEvent, getEventUser } from './getEvent'
import { getUser } from './getUser'

export const subscribeToNotif = async (
  _userAddress: AddressType,
  _collectionAddress: AddressType,
  chainId: CHAIN_ID,
  eventType: NotificationType
) => {
  try {
    // extra run-time validation to ensure correct data is passed to db
    if (!isAddress(_userAddress)) throw new Error('invalid user address')
    if (!isAddress(_collectionAddress)) throw new Error('invalid collection address')
    if (!Object.values(NotificationType).includes(eventType))
      throw new Error('invalid event type')
    if (!isValidNetworkId(chainId)) throw new Error('invalid network id')

    const userAddress = _userAddress.toLowerCase() as AddressType
    const collectionAddress = _collectionAddress.toLowerCase() as AddressType
    const eventId = createEventId(collectionAddress, chainId, eventType)

    const [userExists, eventExists, subscriptionExists] = await Promise.all([
      await getUser(userAddress),
      await getEvent(eventId),
      await getEventUser(eventId, userAddress),
    ])

    if (subscriptionExists && userExists && eventExists) {
      throw new Error('Already subscribed')
    }
    let batch = []

    if (!userExists) {
      batch.push({ document: addUserMutation, variables: { userAddress } })
    }
    if (!eventExists) {
      batch.push({
        document: addEventMutation,
        variables: { eventId, dao: collectionAddress, eventType },
      })
    }
    if (!subscriptionExists) {
      batch.push({ document: addEventUserMutation, variables: { eventId, userAddress } })
    }

    const client = createHasuraClient()

    // uses batch request to ensure all mutations are executed
    return await client.batchRequests(batch)
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }
}


import { AddressType, CHAIN_ID } from 'src/typings'
import { NotificationType } from 'src/typings/pushWebhookTypes'
import { createHasuraClient } from 'src/utils/hasura'
import { createEventId } from 'src/utils/pushWebhook'

import { addEventMutation, addEventUserMutation, addUserMutation } from '../gql/mutations'
import { getEvent, getEventUser } from './getEvent'
import { getUser } from './getUser'

// extra validation to ensure correct data is passed
// if (!isAddress(userAddress)) throw new Error('invalid user address')
// if (!isAddress(collectionAddress)) throw new Error('invalid collection address')
// if (!Object.values(NotificationType)[eventType]) throw new Error('invalid event type')
// if (!isValidNetworkId(chainId)) throw new Error('invalid network id')
export const subscribeToNotif = async (
  _userAddress: AddressType,
  _collectionAddress: AddressType,
  chainId: CHAIN_ID,
  eventType: NotificationType
) => {
  try {
    const userAddress = _userAddress.toLowerCase() as AddressType
    const collectionAddress = _collectionAddress.toLowerCase() as AddressType
    const eventId = createEventId(collectionAddress, chainId, eventType)

    const [userExists, eventExists, subscriptionExists] = await Promise.all([
      await getUser(userAddress),
      await getEvent(eventId),
      await getEventUser(eventId, userAddress),
    ])
    console.log({ userExists, eventExists, subscriptionExists })

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

    const res = await client.batchRequests(batch)
  } catch (error: any) {
    console.error(error)
    throw new Error(error)
  }

  // if yes, skip
  // if no, batch addUser call
  // check if user exists
  // if yes, skip
  // if no, batch addEvent call
  // chack if user is subscribed to event
  // if yes, return error('a'ready subscribed')
  // if no, batch addEventUser call
}

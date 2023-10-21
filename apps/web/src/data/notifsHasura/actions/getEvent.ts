import { AddressType } from 'src/typings'
import { EventUsersQuery } from 'src/typings/pushWebhookTypes'
import { createHasuraClient } from 'src/utils/hasura'

import { eventUsers, queryEvent, queryEventUser } from '../gql/queries'

export const getEventUsers = async (eventId: string) => {
  const client = createHasuraClient()

  const res = await client.request<EventUsersQuery>(eventUsers, { id: eventId })
  const data = res?.testnet_events_by_pk?.users?.map((e: { user: string }) => e.user)
  return data
}

export const getEvent = async (eventId: string) => {
  const client = createHasuraClient()

  const res = await client.request(queryEvent, { id: eventId })
  const data = res?.testnet_events_by_pk
  return data
}

export const getEventUser = async (eventId: string, userAddress: AddressType) => {
  const client = createHasuraClient()

  const res = await client.request(queryEventUser, {
    eventId: eventId,
    userAddress: userAddress,
  })
  const data = res?.testnet_event_user_by_pk
  return data
}

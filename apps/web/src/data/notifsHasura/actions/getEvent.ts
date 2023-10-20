import { createHasuraClient } from 'src/utils/hasura'

import { eventUsers, queryEvent } from '../gql/queries'

export const getEventUsers = async (eventId: string) => {
  const client = createHasuraClient()

  const res = await client.request(eventUsers, { id: eventId })
  const data = res?.testnet_events_by_pk?.users?.map((e: { user: string }) => e.user)
  return data
}

export const getEvent = async (eventId: string) => {
  const client = createHasuraClient()

  const res = await client.request(queryEvent, { id: eventId })
  const data = res?.testnet_events_by_pk
  return data
}

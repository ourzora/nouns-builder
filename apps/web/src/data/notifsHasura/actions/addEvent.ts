import { AddressType } from 'src/typings'
import { createHasuraClient } from 'src/utils/hasura'

import { addEventMutation } from '../gql/mutations'

export const addEvent = async (
  collectionAddress: AddressType,
  eventId: string,
  eventType: string
) => {
  const client = createHasuraClient()

  const res = await client.request(addEventMutation, {
    dao: collectionAddress,
    eventId,
    eventType,
  })

  return res
}

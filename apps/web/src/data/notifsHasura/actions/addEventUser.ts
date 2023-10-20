import { AddressType } from 'src/typings'
import { createHasuraClient } from 'src/utils/hasura'

import { addEventUserMutation } from '../gql/mutations'

export const addEventUser = async (userAddress: AddressType, eventId: string) => {
  const client = createHasuraClient()

  const res = await client.request(addEventUserMutation, {
    userAddress,
    eventId,
  })

  return res
}

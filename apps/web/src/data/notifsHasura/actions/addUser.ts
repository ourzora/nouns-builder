import { AddressType } from 'src/typings'
import { createHasuraClient } from 'src/utils/hasura'

import { addUserMutation } from '../gql/mutations'

export const addUser = async (userAddress: AddressType) => {
  const client = createHasuraClient()

  const res = await client.request(addUserMutation, { userAddress })

  return res
}

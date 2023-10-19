
import { AddressType } from 'src/typings'
import { createHasuraClient } from 'src/utils/hasura'

import { userEvents } from '../gql/queries'

export const getUserEvents = async (userAddress: AddressType) => {
  const client = createHasuraClient()

  const res = await client.request(userEvents, { id: userAddress })
  const data = res?.testnet_users_by_pk?.events?.map((e: { event: string }) => e.event)
  return data
}

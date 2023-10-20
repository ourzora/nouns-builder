import { AddressType } from 'src/typings'
import { createHasuraClient } from 'src/utils/hasura'

import { queryUser, userEvents } from '../gql/queries'

type UserWithEvents = {
  testnet_users_by_pk: {
    id: string
    events: {
      event: string
    }[]
  }
}

export const getUserEvents = async (userAddress: AddressType) => {
  const client = createHasuraClient()

  const res = await client.request<UserWithEvents>(userEvents, {
    id: userAddress.toLowerCase(),
  })

  const data =
    res?.testnet_users_by_pk?.events?.map((e: { event: string }) => e.event) || []
  return data
}
export const getUser = async (userAddress: AddressType) => {
  const client = createHasuraClient()

  const res = await client.request(queryUser, { id: userAddress.toLowerCase() })
  const data = res?.testnet_users_by_pk
  return data
}

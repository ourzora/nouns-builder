import { gql } from 'graphql-request'

import { AddressType } from 'src/typings'
import { createHasuraClient } from 'src/utils/hasura'

const document = gql`
  query GetUser($id: String!) {
    testnet_users_by_pk(id: $id) {
      events {
        event
      }
    }
  }
`

export const getUserEvents = async (userAddress: AddressType) => {
  const client = createHasuraClient()

  const res = await client.request(document, { id: userAddress })
  const data = res?.testnet_users_by_pk?.events?.map((e: { event: string }) => e.event)
  return data
}

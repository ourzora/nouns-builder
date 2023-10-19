import { gql } from 'graphql-request'

import { createHasuraClient } from 'src/utils/hasura'

const document = gql`
  query GetUser($id: String!) {
    testnet_events_by_pk(id: $id) {
      id
      users {
        user
      }
    }
  }
`

export const getEventUsers = async (eventId: string) => {
  const client = createHasuraClient()

  const res = await client.request(document, { id: eventId })
  const data = res?.testnet_events_by_pk?.users?.map((e: { user: string }) => e.user)
  return data
}

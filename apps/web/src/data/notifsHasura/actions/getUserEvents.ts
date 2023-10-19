import { GraphQLClient } from 'graphql-request'

import { AddressType } from 'src/typings'

const HASURA_URL = 'https://causal-tarpon-66.hasura.app/v1/graphql'

const document = `query GetUser($id: String!) {
  testnet_users_by_pk(id: $id) {
    events {
      event
    }
  }
}`

export const getUserEvents = async (userAddress: AddressType) => {
  const client = new GraphQLClient(HASURA_URL, {
    headers: {
      'x-hasura-admin-secret':
        'x1MDm2Gi7yjRtQZ7DA146Gzw5j4DdOdZduanLhUz5oAYEol8cV0f4372RmcNTbrV',
      'content-type': 'application/json',
    },
  })

  const res = await client.request(document, { id: userAddress })
  const data = res?.testnet_users_by_pk?.events?.map((e: { event: string }) => e.event)
  return data
}

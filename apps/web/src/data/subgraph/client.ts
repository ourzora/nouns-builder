import { GraphQLClient } from 'graphql-request'

import { PUBLIC_SUBGRAPH_URL } from 'src/constants/subgraph'

import { getSdk } from './sdk.generated'

const globalForClient = global as unknown as {
  subgraphClient: GraphQLClient | undefined
}

export const client =
  globalForClient.subgraphClient ??
  new GraphQLClient(PUBLIC_SUBGRAPH_URL, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

if (process.env.NODE_ENV !== 'production') globalForClient.subgraphClient = client

export const sdk = getSdk(client)

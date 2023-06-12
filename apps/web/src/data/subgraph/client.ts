import { GraphQLClient } from 'graphql-request'

import { getSdk } from './sdk.generated'

const globalForClient = global as unknown as {
  subgraphClient: GraphQLClient | undefined
}

export const client =
  globalForClient.subgraphClient ??
  new GraphQLClient(process.env.NEXT_PUBLIC_SUBGRAPH!, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

if (process.env.NODE_ENV !== 'production') globalForClient.subgraphClient = client

export const sdk = getSdk(client)

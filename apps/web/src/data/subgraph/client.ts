import { GraphQLClient } from 'graphql-request'

import { PUBLIC_SUBGRAPH_URL } from 'src/constants/subgraph'
import { CHAIN_ID } from 'src/typings'

import { getSdk } from './sdk.generated'

const globalForClient = global as unknown as {
  subgraphClient: Map<CHAIN_ID, GraphQLClient>
}

export class SDK {
  static connect(chainId: CHAIN_ID) {
    if (!globalForClient.subgraphClient) globalForClient.subgraphClient = new Map()

    const client = globalForClient.subgraphClient.has(chainId)
      ? globalForClient.subgraphClient.get(chainId)!
      : new GraphQLClient(PUBLIC_SUBGRAPH_URL[chainId], {
          headers: {
            'Content-Type': 'application/json',
          },
        })

    if (process.env.NODE_ENV !== 'production')
      globalForClient.subgraphClient.set(chainId, client)

    return getSdk(client)
  }
}

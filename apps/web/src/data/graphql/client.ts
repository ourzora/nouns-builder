import { GraphQLClient } from 'graphql-request'

import { getSdk } from './sdk.generated'

const globalForClient = global as unknown as {
  zoraClient: GraphQLClient | undefined
}

export const client =
  globalForClient.zoraClient ??
  new GraphQLClient('https://api.zora.co/graphql', {
    headers: {
      'Content-Type': 'application/json',
      ...(!!process.env.NEXT_PUBLIC_ZORA_API_KEY && {
        'X-API-KEY': process.env.NEXT_PUBLIC_ZORA_API_KEY,
      }),
    },
  })

if (process.env.NODE_ENV !== 'production') globalForClient.zoraClient = client

export const sdk = getSdk(client)

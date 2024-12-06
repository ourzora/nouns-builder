import {GraphQLClient} from 'graphql-request'

import {CHAIN_ID} from 'src/typings'

import {getSdk} from './sdk.generated'
import {PUBLIC_SUBGRAPH_URL} from "src/constants/subgraph";

const globalForClient = global as unknown as {
    subgraphClient: Map<CHAIN_ID, GraphQLClient>
}

export class SDK {
    static connect(chainId: CHAIN_ID) {
        if (!globalForClient.subgraphClient) globalForClient.subgraphClient = new Map()

        const client = globalForClient.subgraphClient.has(chainId)
            ? globalForClient.subgraphClient.get(chainId)!
            : new GraphQLClient(PUBLIC_SUBGRAPH_URL.get(chainId) as string, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

        if (process.env.NODE_ENV !== 'production')
            globalForClient.subgraphClient.set(chainId, client)

        return getSdk(client)
    }
}

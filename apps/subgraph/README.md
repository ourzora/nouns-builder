# Nouns Builder Subgraph

This `README` is intended to provide app specific context.

### App Dependencies

The Nouns Builder Subgraph is built on the Graph Protocol and includes the following dependencies:

- [@graphprotocol/graph-cli](https://www.npmjs.com/package/@graphprotocol/graph-cli) - cli for developing and testing subgraphs
- [@graphprotocol/graph-ts](https://www.npmjs.com/package/@graphprotocol/graph-ts) - core typescript library for writing subgraphs

### Chain Environment

Nouns Builder subgraph currently supports two networks: `mainnet` and `goerli`. The environment variables indicated below dictate the network that the app interacts with.

You can swap out the environment variables as defined below to run the subgraph locally against mainnnet or testnet locally.

```
# the default chain id defined in .env, to run against testnet
NETWORK_RPC=<TESTNET_RPC_ENDPOINT>
NETWORK_NAME=goerli

# to run against mainnet locally
NETWORK_RPC=<MAINNET_RPC_ENDPOINT>
NETWORK_NAME=mainnet
```

### Development

- generate types with `pnpm codegen`
- build the subgraph with `pnpm build`
- run the local graph node with `pnpm local-node`
  - for M1 mac users you will need to use a local image of `graphprotocol/graph-node` [instructions here](https://github.com/graphprotocol/graph-node/tree/master/docker)
- create the local subgraph with `pnpm create-local`
- deploy changes to the local subgraph with `pnpm deploy-local`

### Deployment

- the subgraph is currently deployed for [mainnet](https://thegraph.com/hosted-service/subgraph/neokry/nouns-builder-mainnet) and [goerli](https://thegraph.com/hosted-service/subgraph/neokry/nouns-builder-goerli)
- to deploy your own version edit the `deploy` script in `package.json` with your deployment information

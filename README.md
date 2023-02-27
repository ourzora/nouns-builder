# Nouns Builder monorepo

This is Nouns Builder front-end mono-repo. You can find Nouns Builder deployed on:

[Mainnet](nous.build)
[Testnet](testnet.nouns.build)

### Apps and packages in this repository include:

`apps`

- `web`: Nouns Builder front-end

`packages`

- `analytics`: Shareable analytics package
- `zoralabs-zord`: Shareable ui components
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `ipfs-service`: api to for image uploads to ipfs

## Quickstart

- Clone this repo
- [Install pnpm](https://pnpm.io/installation#using-corepack)
- Run `pnpm i` to install dependencies for all projects
- Install [anvil via foundryup](https://github.com/foundry-rs/foundry/blob/master/README.md#installation)
- Run `pnpm dev` to start watching and building

## Environment variables

This app has several third party api keys that you need in order to run Builder. We ask that you supply your own secrets locally for running in development environment.

```
#alchemy
PRIVATE_ALCHEMY_ID=
ANVIL_FORK_URL=https://eth-mainnet.alchemyapi.io/v2/$PRIVATE_ALCHEMY_ID
ANVIL_BLOCK_NUMBER=8305745
NEXT_PUBLIC_ALCHEMY_ID=

#etherscan
ETHERSCAN_API_KEY=

#redis uri
PRIVATE_REDIS_CONNECTION_URI=

#optional zora api key
NEXT_PUBLIC_ZORA_API_KEY=

#tenderly
TENDERLY_ACCESS_KEY=
TENDERLY_PROJECT=
TENDERLY_USER=
```

## Running tests

**Note**: To run tests you need to [install anvil](https://github.com/foundry-rs/foundry/tree/master/anvil).

Once anvil is installed, you can now locally run anvil (from the root directory in the monorepo) in a separate terminal session to start a local ethereum node:
`pnpm run anvil`

Now you can run the tests in a separate terminal session:
`pnpm run test`

You can also run the tests in watchmode, which will react to any source code or test files changing. To do that, run:
`pnpm run test:watch`

## Contributions

TBD

## Community

TBD

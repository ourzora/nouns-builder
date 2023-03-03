# Nouns Builder monorepo

This is Nouns Builder front-end mono-repo. You can find Nouns Builder deployed on:

- [Mainnet](nous.build)
- [Testnet](testnet.nouns.build)

For an introduction to Nouns Builder and its concept, you can find further [documentation here](https://docs.zora.co/docs/smart-contracts/nouns-builder/intro). You can also find the [contract code here](https://github.com/ourzora/nouns-protocol).

### Apps and packages in this repository include:

`apps`

- `web`: Nouns Builder front-end

`packages`

- `blocklist`: Package to check for sanctioned wallet addresses
- `analytics`: Shareable analytics package
- `zoralabs-zord`: Shareable ui components
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `ipfs-service`: api to for image uploads to ipfs

## Quickstart

- Clone this repo locally
- [Install pnpm](https://pnpm.io/installation#using-corepack)
- Run `pnpm i` to install dependencies for all projects
- Add the necessary environment variables to your `.env.local` as defined in the step below
- Run `pnpm dev` to start watching and building

## Environment variables

This app has several third party api keys that you need in order to run Builder. We ask that you supply your own secrets locally for running in development environment. Non-secret environment variables are already included in the `.env` files in this repo.

You need add the following variables to a `.env.local` file in this root directory (needed to run anvil)

```
#alchemy
PRIVATE_ALCHEMY_ID=<ALCHEMY_API_KEY>
ANVIL_FORK_URL=https://eth-mainnet.alchemyapi.io/v2/$PRIVATE_ALCHEMY_ID
ANVIL_BLOCK_NUMBER=8305745
```

You need to add the following app variables in a `.env.local` file within `apps/web` directory

```
#alchemy
NEXT_PUBLIC_ALCHEMY_ID=<ALCHEMY_API_KEY>

#etherscan
ETHERSCAN_API_KEY=<ETHERSCAN_API_KEY>

#redis uri
PRIVATE_REDIS_CONNECTION_URI=<REDIS_URI_INSTANCE>

#optional zora api key
NEXT_PUBLIC_ZORA_API_KEY=

#tenderly
TENDERLY_ACCESS_KEY=<API_KEY>
TENDERLY_PROJECT=<PROJECT_NAME>
TENDERLY_USER=<ACCOUNT_NAME>
```

## Running tests

> Note: to run tests you need to [install anvil](https://github.com/foundry-rs/foundry/blob/master/README.md#installation).

Once anvil is installed, you can now locally run anvil (from the root directory in the monorepo) in a separate terminal session to start a local ethereum node:
`pnpm run anvil`

Now you can run the tests in a separate terminal session:
`pnpm run test`

You can also run the tests in watchmode, which will react to any source code or test files changing. To do that, run:
`pnpm run test:watch`

## Deployments

Nouns Builder is deployed on [Vercel](https://vercel.com/). Any pull requests will trigger a new preview deployment providing you with an environment to test out and preview changes.

## Contributions

Please refer to our [contributions guideline](/.github/contributing.md) on how best to contribute.

## Community

TBD

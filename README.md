# Nouns Builder monorepo

This is Nouns Builder front-end mono-repo. You can find Nouns Builder deployed on:

- [Mainnet](//nouns.build)
- [Goerli testnet](//testnet.nouns.build)

For an introduction to Nouns Builder and its concept, you can find further [documentation here](https://docs.zora.co/contracts/intro). You can also find [Nouns Protocol here](https://github.com/ourzora/nouns-protocol).

### Apps and packages in this repository include:

`apps`

- `web`: Nouns Builder front-end
- `subgraph`: Nouns Builder subgraph

`packages`

- `blocklist`: Package to check for sanctioned wallet addresses
- `analytics`: Shareable analytics package
- `zoralabs-zord`: Shareable ui components
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `ipfs-service`: api to for image uploads to ipfs

## Quickstart

#### Get up and running

1. Clone this repo locally
2. [Install pnpm](https://pnpm.io/installation#using-corepack)

3. Add the required [environment variables](#environment-variables)

4. Install dependencies across all apps and packages

```
pnpm i
```

5. Once environment variables are defined, you can run the app in dev mode

```
pnpm dev
```

#### Linting and formatting

> Note: linting and prettier formatting are automatically run on pre-push hooks

To lint:

```
pnpm run lint
```

To format:

```
pnpm run format
```

To run type checks:

```
pnpm run type-check
```

#### To create and run a production build

```
> pnpm run build
> pnpm run start
```

## Environment variables

This app has several third party api keys that you need in order to run Builder:

- **rpc api** any rpc api for ethereum will do
- [tenderly](https://docs.tenderly.co/simulations-and-forks/simulation-api) in order to simulate transactions
- [etherscan](https://docs.etherscan.io/api-endpoints/contracts) to dynamically fetch abis

We ask that you supply your own secrets locally for running in development environment. Non-secret environment variables are already included in the `.env` files in this repo.

Add the following variables to `.env.local` within this root directory (needed to run tests against a local anvil node):

```
ANVIL_FORK_URL=$RPC_URL
ANVIL_BLOCK_NUMBER=8305745
```

Add the following variables to `apps/web/.env.local`:

```
NEXT_PUBLIC_TENDERLY_RPC_KEY=<TENDERLY_API_KEY>


#tenderly
TENDERLY_ACCESS_KEY=<API_KEY>
TENDERLY_PROJECT=<PROJECT_NAME>
TENDERLY_USER=<ACCOUNT_NAME>

#etherscan (optional to run locally, this is for dynamically fetching abis in the custom transaction builder)
ETHERSCAN_API_KEY=<ETHERSCAN_API_KEY>
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

### Client

The Nouns Builder client is deployed on [Vercel](https://vercel.com/). Any pull requests will trigger a new preview deployment providing you with an environment to test out and preview changes.

### Subgraph

The Nouns Builder subgraph is deployed for the following networks:

- [Ethereum Mainnet](https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-mainnet)
- [Ethereum Goerli](https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-goerli)
- [Optimism Mainnet](https://api.thegraph.com/subgraphs/name/neokry/noun-builder-optimism-mainnet)
- [Optimism Goerli](https://api.thegraph.com/subgraphs/name/neokry/nouns-builder-optimism-goerli)
- [Zora Mainnet](https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-zora-mainnet/stable/gn)
- [Zora Goerli](https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-zora-testnet/stable/gn)
- [Base Mainnet](https://api.goldsky.com/api/public/project_clkk1ucdyf6ak38svcatie9tf/subgraphs/nouns-builder-base-mainnet/stable/g)
- [Base Goerli](https://api.studio.thegraph.com/query/49279/nouns-builder-base-goerli/version/latest)

## Contributions

Please refer to our [contributions guideline](/.github/contributing.md) on how best to contribute.

## Questions?

Feel free to reach out to us via [twitter](https://twitter.com/nounsbuilder), [discord](https://discord.gg/JpMKps2W), or via email at <opensource@zora.co>

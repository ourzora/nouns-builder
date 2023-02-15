# Nouns Builder monorepo

## Setup

- Clone this repo
- [Install pnpm](https://pnpm.io/installation#using-corepack)
- Run `pnpm i` to install dependencies for all projects
- Install [anvil via foundryup](https://github.com/foundry-rs/foundry/blob/master/README.md#installation)
- Run `pnpm dev` to start watching and building

## Environment variables

TBD

## Apps and Packages

- `web`: Nouns Builder [Next.js](https://nextjs.org/) app
- `zoralabs-zord`: Shareable ui components
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo
- `ipfs-service`: api to for image uploads to ipfs

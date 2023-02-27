# Nouns Builder Web App

This `README` is intended to provide app specific context.

### App Dependencies

Nouns Builder is built on Nextjs and the following dependencies:

- [graphql-request](https://www.npmjs.com/package/graphql-request) - graphql client
- [graphql-codegen](https://the-guild.dev/graphql/codegen) - to generate typed graphql queries
- [swr](https://swr.vercel.app/) - for data fetching and response caching
- [zustand](https://github.com/pmndrs/zustand) - to manage global and persistent state
- [vanilla-extract](https://vanilla-extract.style/) - for styles
- [tenderly](https://docs.tenderly.co/simulations-and-forks/simulation-api) - to simulate transactions
- [formik](https://formik.org/docs/api/formik)
- [wagmi](https://wagmi.sh/)
- [rainbowkit](https://www.rainbowkit.com/)

### Folder organisation

The app is mostly organised by function and for the larger areas of concern there are specific modules that group by domain. Grouping by modules enables tightly coupled components, hooks, utils, constants, etc to be co-located.

`components`
`constants`
`hooks`
`layouts`
`pages`
`services`
`stores`
`styles`
`test`
`typings`
`utils`
`data` - network requests

- `graphql` - generated sdk, queries, fragements, and data transformation helpers
- `contract` - generated abis, contract reads, and data transformation helpers

`modules`

- `auction` - a given token auction
- `create-dao` - create a dao
- `create-proposal` - create a proposal
- `dao` - dao entity related (dao activity, dao feed, explore daos)
- `proposal` - proposal entity related

### Writing Tests

We use [vitest](https://vitest.dev) to run tests and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro) for rendering react components and hooks. Some tests might require contract reads or writes and can be run against a local ethereum node (using Anvil).

You can find a custom render function in `test/utils.tsx` that includes wagmi and swr config as a wrapper.

```
import React from 'react'
import { screen, waitFor } from '@testing-library/react'
import { useBlockNumber } from 'wagmi'
import { describe, expect, it } from 'vitest'
import { render } from 'src/test/utils'
describe('test', () => {
  it('should render wagmi', async () => {
    const BlockNumber = () => {
      const { data, isLoading, isError } = useBlockNumber()
      if (isLoading) return <div>Fetching block number…</div>
      if (isError) return <div>Error fetching block number</div>
      return <div>Block number: {data}</div>
    }
    render(<BlockNumber />)
    await waitFor(() => expect(screen.getByText(/15578840/)).toBeInTheDocument())
    expect(screen.getByText(/15578840/)).toBeInTheDocument()
  })
})
```

### Generating typed queries

We use [graphql-codegen](https://www.the-guild.dev/graphql/codegen) to generate typed queries for graphql-request based off of the Zora [api schema](https://api.zora.co/graphql). All queries are defined under `src/data/graphql/queries/` and auto-generated to `src/data/graphql/sdk.generated.ts`. The codegen config is defined in `codegen.yml`.

Note: `sdk.generated.ts` is automatically generated and should not be touched

1. Add relevant query/fragment to `src/data/graphql/queries` or `src/data/graphql/fragments`
2. Run `pnpm run codegen` to re-generate `sdk.generated.ts`
3. Check in and commit updated `sdk.generated.ts` file
4. Use the generated sdk query and types (as referenced below)

```
// defined query and fragment
query daosByMember($addresses: [String!], $chain: Chain!) {
  nouns {
    nounsDaos(
      networks: { chain: $chain, network: ETHEREUM }
      where: { memberAddresses: $addresses }
      pagination: { limit: 25 }
    ) {
      nodes {
        ...NounsDao
      }
    }
  }
}

// the generated output as an api
sdk.daosByMember({ addresses: ['0x123'], chain: Chain.GOERLI })
```

Note: If you use vscode, it might also be helfpul to install the vscode plugin for graphql to pick up syntax highlighting for `.graphql` files.

### Styling

TBD

ZORD
Vanilla Extract
Atoms

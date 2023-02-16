# Nouns Builder

## Getting set up

TODOs

## Testing

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

#### Running tests

**Note**: To run tests you need to [install anvil](https://github.com/foundry-rs/foundry/tree/master/anvil).

Once anvil is installed, you can now locally run anvil (from the root directory in the monorepo) in a separate terminal session to start a local ethereum node:
`pnpm run anvil`

Now you can run the tests in a separate terminal session:
`pnpm run test`

You can also run the tests in watchmode, which will react to any source code or test files changing. To do that, run:
`pnpm run test:watch`

## Graphql codegen

We use [graphql-codegen](https://www.the-guild.dev/graphql/codegen) to generate typed queries for graphql-request based off of the [api schema](https://api.zora.co/graphql). All queries are defined under `src/graphql` and auto-generated to `sdk.ts`. The codegen config is defined in `codegen.yml`.

Note: `sdk.ts` is automatically generated and should not be touched

1. Add query or fragments to `src/graphql`
2. Run `pnpm run codegen` to re-generate `sdk.ts`
3. Check in and commit updated `sdk.ts`
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

If you use vscode, it might also be helfpul to install the vscode plugin for graphql to pick up syntax highlighting for `.graphql` files.

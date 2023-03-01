# Blocklist

## Description

This module provides a way to check ETH wallet addresses against those found in the Specially Designated Nationals And Blocked Persons List (SDN) Human Readable Lists published by US Treasury.

A package script `pnpm run update` can be used to fetch the latest list and update the `sdnlist.json` file.

## Usage

Since this module is not compiled, to use it in your Next.js project you must enable module transpilation, ie with [next-transpile-modules](https://github.com/martpie/next-transpile-modules).

```js
const withTM = require('next-transpile-modules')(['blocklist'])

module.exports = withTM({
  // Next.js config
})
```

Then you can use the provided React hook to check an address against the block list.

```ts
import { useBlocklist } from 'blocklist'

const { address } = useAccount()

const isBlocked = useBlocklist(address)

useEffect(() => {
  if (isBlocked) {
    // do something
  }
}, [isBlocked])
```

There is also a simple imperative function to perform this check synchronously.

```ts
import { isBlocked } from 'blocklist'

if (isBlocked('0x...')) {
  // do something
}
```

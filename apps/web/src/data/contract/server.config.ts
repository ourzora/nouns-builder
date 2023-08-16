import { createConfig } from 'wagmi'

import { publicClient } from './chains'

createConfig({
  publicClient,
})

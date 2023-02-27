import { createClient } from 'wagmi'

import { provider } from './chains'

createClient({
  provider,
})

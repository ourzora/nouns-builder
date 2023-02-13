import { createClient } from 'wagmi'
import { provider } from './chains'

export const serverClient = createClient({
  provider,
})

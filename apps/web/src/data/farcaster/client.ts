import { getSSLHubRpcClient } from '@farcaster/hub-nodejs'

import { FARCASTER_HUB_RPC } from 'src/constants/farcasterHub'

export const farcasterClient = () => {
  const client = getSSLHubRpcClient(FARCASTER_HUB_RPC)

  return client
}

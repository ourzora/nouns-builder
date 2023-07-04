import { getSSLHubRpcClient } from '@farcaster/hub-nodejs'

export const BUILDER_COLLECTION = '0xdf9b7d26c8fc806b1ae6273684556761ff02d422'
export const PURPLE_COLLECTION = '0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60'

export const farcasterClient = () => {
  const client = getSSLHubRpcClient(
    'er'
    // process.env.FARCASTER_HUB || 'testnet1.farcaster.xyz:2283'
  )

  return client
}

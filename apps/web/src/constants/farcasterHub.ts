//testnet will stop the error, it will not return feeds
export const FARCASTER_HUB_RPC = process.env.NEXT_FARCASTER_HUB
process.env.NEXT_FARCASTER_HUB || 'testnet1.farcaster.xyz:2283'

// test data
export const BUILDER_COLLECTION = '0xdf9b7d26c8fc806b1ae6273684556761ff02d422'
export const PURPLE_COLLECTION = '0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60'
//testnet will stop the error, it will not return feeds
export const FARCASTER_HUB_RPC = process.env.NEXT_FARCASTER_HUB
process.env.NEXT_FARCASTER_HUB || 'testnet1.farcaster.xyz:2283'

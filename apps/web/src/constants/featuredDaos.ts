import { CHAIN_ID } from 'src/typings'

export type TestnetChain =
  | CHAIN_ID.SEPOLIA
  | CHAIN_ID.OPTIMISM_SEPOLIA
  | CHAIN_ID.BASE_SEPOLIA
  | CHAIN_ID.ZORA_SEPOLIA

export const PUBLIC_FEATURED_DAOS = {
  [CHAIN_ID.SEPOLIA]: [
    {
      auctionAddress: '0x1fd8ab3d28589b7af58b0224c70ceb3e955c9882',
      tokenAddress: '0x42D7665F431fceFC95a6fB550Bc2842beeDF3b37',
      name: 'test',
    },
    {
      auctionAddress: '0x1fd8ab3d28589b7af58b0224c70ceb3e955c9882',
      tokenAddress: '0x42D7665F431fceFC95a6fB550Bc2842beeDF3b37',
      name: 'test',
    },
    {
      auctionAddress: '0x1fd8ab3d28589b7af58b0224c70ceb3e955c9882',
      tokenAddress: '0x42D7665F431fceFC95a6fB550Bc2842beeDF3b37',
      name: 'test',
    },
  ],
  [CHAIN_ID.OPTIMISM_SEPOLIA]: [
    {
      auctionAddress: '0x4657444b584ad3a88c5f9daa446c6689b252793a',
      tokenAddress: '0x33756a2B2F69B4B5D80E6474B35Bf3d65aA6C8Ab',
      name: 'test',
    },
    {
      auctionAddress: '0x4657444b584ad3a88c5f9daa446c6689b252793a',
      tokenAddress: '0x33756a2B2F69B4B5D80E6474B35Bf3d65aA6C8Ab',
      name: 'test',
    },
    {
      auctionAddress: '0x4657444b584ad3a88c5f9daa446c6689b252793a',
      tokenAddress: '0x33756a2B2F69B4B5D80E6474B35Bf3d65aA6C8Ab',
      name: 'test',
    },
  ],
  [CHAIN_ID.BASE_SEPOLIA]: [
    {
      auctionAddress: '0x03855976fcb91bf23110e2c425dcfb1ba0635b79',
      tokenAddress: '0x3b7626182aAB7a70D4B2B254C4F19f5f48A7E6D8',
      name: 'test',
    },
    {
      auctionAddress: '0x03855976fcb91bf23110e2c425dcfb1ba0635b79',
      tokenAddress: '0x3b7626182aAB7a70D4B2B254C4F19f5f48A7E6D8',
      name: 'test',
    },
    {
      auctionAddress: '0x03855976fcb91bf23110e2c425dcfb1ba0635b79',
      tokenAddress: '0x3b7626182aAB7a70D4B2B254C4F19f5f48A7E6D8',
      name: 'test',
    },
  ],
  [CHAIN_ID.ZORA_SEPOLIA]: [
    {
      auctionAddress: '0x03855976fcb91bf23110e2c425dcfb1ba0635b79',
      tokenAddress: '0x3b7626182aAB7a70D4B2B254C4F19f5f48A7E6D8',
      name: 'test',
    },
    {
      auctionAddress: '0x03855976fcb91bf23110e2c425dcfb1ba0635b79',
      tokenAddress: '0x3b7626182aAB7a70D4B2B254C4F19f5f48A7E6D8',
      name: 'test',
    },
    {
      auctionAddress: '0x03855976fcb91bf23110e2c425dcfb1ba0635b79',
      tokenAddress: '0x3b7626182aAB7a70D4B2B254C4F19f5f48A7E6D8',
      name: 'test',
    },
  ],
}

import { CHAIN_ID } from 'src/typings'

export type TestnetChain = CHAIN_ID.GOERLI | CHAIN_ID.OPTIMISM_GOERLI

export const PUBLIC_FEATURED_DAOS = {
  [CHAIN_ID.GOERLI]: [
    {
      auctionAddress: '0x8F1B054500ED7a2B06619CD2E5D70415Bc9d6b8a',
      tokenAddress: '0x6e13ED8472fBBd384C260538323906fc1eCb0d7B',
      name: 'MuseumDAO',
    },
    {
      auctionAddress: '0x736EaF8C02dc093E392131068B7F17f34C4f7791',
      tokenAddress: '0x7F29a9dfBFf0e6DB6c8a449Fee282F9B5f5fc99f',
      name: 'RecordLabelDAO',
    },
    {
      auctionAddress: '0xC4E181443EE3696cF19EB21578A6310BB75aA117',
      tokenAddress: '0x579B2fF0F4bd719ad7628208606688a8Ac871644',
      name: 'StartupDAO',
    },
  ],
  [CHAIN_ID.OPTIMISM_GOERLI]: [
    {
      auctionAddress: '0x0Ba1D0999C4EeBd55671dfB0daE2aaE5C6652Da4',
      tokenAddress: '0x29372170f43b13ca85eb0c17764f99e468739053',
      name: 'Another Test',
    },
    {
      auctionAddress: '0x0Ba1D0999C4EeBd55671dfB0daE2aaE5C6652Da4',
      tokenAddress: '0x29372170f43b13ca85eb0c17764f99e468739053',
      name: 'Another Test',
    },
    {
      auctionAddress: '0xD471e841e0EA469c315fE237a83C5952fA078138',
      tokenAddress: '0xc2047245f065ba2d4cc8276862723a159dd9d83b',
      name: 'Test',
    },
  ],
  [CHAIN_ID.BASE_GOERLI]: [
    {
      auctionAddress: '0x03855976Fcb91bF23110E2C425dCfb1BA0635b79',
      tokenAddress: '0x3b7626182aab7a70d4b2b254c4f19f5f48a7e6d8',
      name: 'Test base DAO',
    },
    {
      auctionAddress: '0x03855976Fcb91bF23110E2C425dCfb1BA0635b79',
      tokenAddress: '0x3b7626182aab7a70d4b2b254c4f19f5f48a7e6d8',
      name: 'Test base DAO',
    },
    {
      auctionAddress: '0x03855976Fcb91bF23110E2C425dCfb1BA0635b79',
      tokenAddress: '0x3b7626182aab7a70d4b2b254c4f19f5f48a7e6d8',
      name: 'Test base DAO',
    },
  ],
}

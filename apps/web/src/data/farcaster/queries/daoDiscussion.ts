
import { FARCASTER_HUB_RPC } from 'src/constants/farcasterHub'

import { farcasterClient } from '../client'

const BUILDER = '0xdf9b7d26c8fc806b1ae6273684556761ff02d422'.toLowerCase()
const PURPLE = '0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60'.toLowerCase()
const CHANNEL_STRING = `chain://eip155:1/erc721:${PURPLE}`

const RAW_CAIP = `eip155:1/erc721:${PURPLE}`

export const getDAOdiscussion = async (collectionAddress: string) => {
  const client = farcasterClient()

  let discussion

  //   const castHashHex = 'ee04762bea3060ce3cca154bced5947de04aa253'
  //   const castHashBytes = hexStringToBytes(castHashHex)._unsafeUnwrap() // Safety: castHashHex is known

  //   const castsResult = await client.getCastsByParent({
  //     parentUrl: 'eip155:1/erc721:0xa45662638e9f3bbb7a6fecb4b17853b7ba0f3a60',
  //   })
  //   console.log('castsResult', castsResult)
  //   return castsResult.map((collection) => collection.messages)
  // console.log(`Connected to ${FARCASTER_HUB_RPC}`)
  //   const castsResult = await client.getCast({ fid: 2, hash: '0xff7708' })

  //   const castsResult = await client.getCastsByFid({ fid: 8928 })

  // console.log('castsResult', castsResult)
  client.$.waitForReady(Date.now() + 5000, async (e) => {
    if (e) {
      console.error(`Failed to connect to ${FARCASTER_HUB_RPC}:`, e)
      process.exit(1)
    } else {
      const castsResult = await client.getCastsByParent({
        parentUrl: CHANNEL_STRING,
      })
      console.log('castsResult', castsResult)
      // castsResult.map((casts) => console.log(casts.messages))
      client.close()
    }
  })
}

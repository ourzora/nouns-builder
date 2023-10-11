import * as PushAPI from '@pushprotocol/restapi'
import { ENV } from '@pushprotocol/restapi/src/lib/constants'
import { NextApiRequest, NextApiResponse } from 'next'
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli } from 'viem/chains'

import { AddressType } from 'src/typings'

const testPush = async (req: NextApiRequest, res: NextApiResponse) => {
  const pk = `0x${process.env.TEST_PUSH_PK}`

  const alchemyKey = `https://eth-goerli.g.alchemy.com/v2/${process.env.PRIVATE_ALCHEMY_ID}`

  const client = createWalletClient({
    chain: goerli,
    transport: http(alchemyKey),
  })

  const account = privateKeyToAccount(pk as AddressType)

  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: account,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `Hello World!`,
        body: `This is the first message broadcast for Builder DAO!`,
      },
      payload: {
        title: `Hello Builder DAO!`,
        body: `This is a sample tex`,
        cta: '',
        img: '',
      },
      channel: 'eip155:5:0x825771E927b024423c66bB7bF09A2ddf0A657011', // your channel address
      env: ENV.STAGING,
    })
    console.log('apiResponse', apiResponse)
  } catch (err) {
    console.error('Error: ', err)
  }
}

export default testPush

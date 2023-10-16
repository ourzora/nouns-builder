import * as PushAPI from '@pushprotocol/restapi'
import { ENV } from '@pushprotocol/restapi/src/lib/constants'
import type { NextApiRequest, NextApiResponse } from 'next'
import { privateKeyToAccount } from 'viem/accounts'

import { SDK } from 'src/data/subgraph/client'
import { AddressType } from 'src/typings'

enum OP {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
}

const CHAIN_ID_BY_SUBGRAPH: Record<string, number> = {
  'auction-test-goerli': 5,
}

const isBid = (body: any) => {
  const { op, data } = body
  return (
    op === OP.INSERT &&
    data.old === null &&
    data.new.settled === false &&
    typeof data.new.highest_bid === 'string'
  )
}

const isSettled = (body: any) => {
  const { op, data } = body
  return op === OP.INSERT && data.old === null && data.new.settled === true ? true : false
}

const isNewToken = (body: any) => {
  const { op, data } = body
  return op === OP.INSERT &&
    data.old === null &&
    data.new.highest_bid === null &&
    data.new.settled === false
    ? true
    : false
}

const pushNotification = async ({
  title,
  body,
  cta,
  img,
}: {
  title: string
  body: string
  cta: string
  img: string
}) => {
  const pk = `0x${process.env.TEST_PUSH_PK}`

  const account = privateKeyToAccount(pk as AddressType)

  const apiResponse = await PushAPI.payloads.sendNotification({
    signer: account,
    type: 1,
    identityType: 2,
    notification: {
      title,
      body,
    },
    payload: {
      title,
      body,
      img,
      cta,
    },
    channel: 'eip155:5:0x825771E927b024423c66bB7bF09A2ddf0A657011',
    env: ENV.STAGING,
  })
  return apiResponse
}

const getDaoData = async (daoId: string, chainId: number) => {
  const dao = await SDK.connect(chainId)
    .daoOGMetadata({
      tokenAddress: daoId.toLowerCase(),
    })
    .then((x) => x.dao)
  return dao
}

const getUserData = async (userAddress: string) => {}

const getTokenData = async (auctionId: string, chainId: number) => {
  const token = await SDK.connect(chainId)
    .token({
      id: auctionId,
    })
    .then((x) => x.token)
  return token
}

const handleNewToken = async (body: any, chainId: number) => {
  const daoId = body?.data?.new?.dao
  const tokenId = body?.data?.new?.token
  if (!daoId || !tokenId) throw new Error('daoId or tokenId not found')

  const tokenData = await getTokenData(tokenId, chainId)
  const daoData = await getDaoData(daoId, chainId)
  if (!daoData || !tokenData) throw new Error('daoData not found')

  await pushNotification({
    title: 'New Auction',
    body: `${tokenData.name} is up for auction!`,
    cta: 'View Auction',
    img: tokenData.image,
  })
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const chainId =
    CHAIN_ID_BY_SUBGRAPH?.[req.body.webhook_name as keyof typeof CHAIN_ID_BY_SUBGRAPH]

  try {
    if (req.body.entity === 'auction') {
      if (!chainId) {
        console.log('chainId not found')
      }
      if (isNewToken(req.body)) {
        await handleNewToken(req.body, chainId)
      }

      if (isBid(req.body)) {
        console.log('NEW BID')
        // get DAO
        // get name
        // get logo
        // create link to DAO
        // get highest bid
        //bidder
        //amount
        // get token
        // get picture
      }

      //   if (isSettled(req.body)) {
      //     console.log('AUCTION SETTLED')

      //     // check if has highest bid
      //     // get highest bid
      //     //bidder
      //     //amount
      //     // get token
      //     // get picture
      //   }
    }
    res.status(200).json({ status: 'ok' })
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Error ' })
  }
}

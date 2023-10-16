import type { NextApiRequest, NextApiResponse } from 'next'

import { SDK } from 'src/data/subgraph/client'

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

const getDaoData = async (daoId: string, chainId: number) => {
  const dao = await SDK.connect(chainId)
    .daoOGMetadata({
      tokenAddress: daoId.toLowerCase(),
    })
    .then((x) => x.dao)
}

const getUserData = async (userAddress: string) => {}

const getAuctionData = async (auctionId: string) => {}

const handleNewToken = async (body: any, chainId: number) => {
  // get DAO
  // get name
  // get logo
  // create link to DAO
  // new token created for auction
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const chainId =
    CHAIN_ID_BY_SUBGRAPH?.[req.body.webhook_name as keyof typeof CHAIN_ID_BY_SUBGRAPH]

  if (req.body.entity === 'auction') {
    if (!chainId) {
      console.log('chainId not found')
    }
    if (isNewToken(req.body)) {
      handleNewToken(req.body, chainId)
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

    if (isSettled(req.body)) {
      console.log('AUCTION SETTLED')

      // check if has highest bid
      // get highest bid
      //bidder
      //amount
      // get token
      // get picture
    }
  }
  res.status(200).json({ status: 'ok' })
}

import { PushAPI } from '@pushprotocol/restapi'
import { ENV } from '@pushprotocol/restapi/src/lib/constants'
import type { NextApiRequest, NextApiResponse } from 'next'
import { createWalletClient, formatEther, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli } from 'viem/chains'

import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { SDK } from 'src/data/subgraph/client'
import { auctionBidRequest } from 'src/data/subgraph/requests/auctionBid'
import { AddressType } from 'src/typings'
import { getEnsName } from 'src/utils/ens'
import { walletSnippet } from 'src/utils/helpers'

enum OP {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
}

const CHAIN_ID_BY_SUBGRAPH: Record<string, number> = {
  'auction-test-goerli': 5,
}

const ALCHEMY_URL = `https://eth-goerli.g.alchemy.com/v2/${process.env.PRIVATE_ALCHEMY_ID}`

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
  embed,
}: {
  title: string
  body: string
  cta: string
  embed: string
}) => {
  const pk = `0x${process.env.TEST_PUSH_PK}`

  const account = privateKeyToAccount(pk as AddressType)

  const signer = createWalletClient({
    account,
    chain: goerli,
    transport: http(ALCHEMY_URL),
  })
  const notifAccount = await PushAPI.initialize(signer, {
    env: ENV.STAGING,
  })

  const sendNotifRes = await notifAccount.channel.send(['*'], {
    notification: {
      title,
      body,
    },
    payload: {
      title,
      body,
      cta,
      embed,
    },
    channel: `eip155:5:${process.env.TEST_PUSH_PUBLIC}`,
  })

  return sendNotifRes
}

const getDaoData = async (daoId: string, chainId: number) => {
  const dao = await SDK.connect(chainId)
    .daoOGMetadata({
      tokenAddress: daoId.toLowerCase(),
    })
    .then((x) => x.dao)
  return dao
}

const getUserData = async (address: string) => {
  const ensName = await getEnsName(address)

  return { displayName: ensName ? ensName : walletSnippet(address, 6), address }
}

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
  const chainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug

  if (!daoData || !tokenData) throw new Error('daoData not found')

  await pushNotification({
    title: `New Token available for auction at ${daoData.name}`,
    body: `${tokenData.name} is up for auction!//nVisit to start bidding!`,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${daoId}/${tokenData.tokenId}`,
    embed: tokenData.image,
  })
}

const handleNewBid = async (body: any, chainId: number) => {
  const daoId = body?.data?.new?.dao
  const tokenId = body?.data?.new?.token
  const bidId = body?.data?.new?.highest_bid

  const tokenData = await getTokenData(tokenId, chainId)
  const daoData = await getDaoData(daoId, chainId)
  const bidData = await auctionBidRequest(bidId, chainId)

  if (!daoData || !tokenData || !bidData)
    throw new Error('Error fetching populating notification data')
  const userData = await getUserData(bidData.bidder)
  const chainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug
  const bidAmount = formatEther(bidData.amount)
  await pushNotification({
    title: `New bid on ${tokenData.name}!`,
    body: `${userData.displayName} has placed on ${tokenData.name} for ${bidAmount} ETH `,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${daoId}/${tokenData.tokenId}`,
    embed: tokenData.image,
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
        console.log('NEW TOKEN')
        await handleNewToken(req.body, chainId)
      }
      if (isBid(req.body)) {
        handleNewBid(req.body, chainId)
        console.log('NEW BID')
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

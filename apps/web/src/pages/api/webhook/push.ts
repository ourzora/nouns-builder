import type { NextApiRequest, NextApiResponse } from 'next'
import { formatEther } from 'viem'

import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { auctionBidRequest } from 'src/data/subgraph/requests/auctionBid'
import { AuctionEvent, Entity } from 'src/typings/pushWebhookTypes'
import {
  CHAIN_ID_BY_SUBGRAPH,
  getDaoData,
  getTokenData,
  getUserData,
  isBid,
  isNewToken,
  isSettled,
  pushNotification,
} from 'src/utils/pushWebhook'

const handleNewToken = async (body: any, chainId: number) => {
  const daoId = body?.data?.new?.dao
  const tokenId = body?.data?.new?.token
  if (!daoId || !tokenId) throw new Error('daoId or tokenId not found')

  const [tokenData, daoData] = await Promise.all([
    getTokenData(tokenId, chainId),
    getDaoData(daoId, chainId),
  ])

  if (!daoData || !tokenData) throw new Error('daoData not found')

  const chainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug

  await pushNotification({
    title: `New Token available for auction at ${daoData.name}`,
    body: `${tokenData.name} is up for auction!`,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${daoId}/${tokenData.tokenId}`,
    embed: tokenData.image,
  })
}

const handleNewBid = async (body: any, chainId: number) => {
  const daoId = body?.data?.new?.dao
  const tokenId = body?.data?.new?.token
  const bidId = body?.data?.new?.highest_bid

  const [tokenData, daoData, bidData] = await Promise.all([
    getTokenData(tokenId, chainId),
    getDaoData(daoId, chainId),
    auctionBidRequest(bidId, chainId),
  ])

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

const handleIsSettled = async (body: AuctionEvent, chainId: number) => {
  const daoId = body?.data?.new?.dao
  const tokenId = body?.data?.new?.token
  const bidId = body?.data?.new?.highest_bid

  if (!daoId || !tokenId || !bidId) throw new Error('daoId, tokenId, or bidId not found')

  const [tokenData, daoData, bidData] = await Promise.all([
    getTokenData(tokenId, chainId),
    getDaoData(daoId, chainId),
    auctionBidRequest(bidId, chainId),
  ])

  if (!daoData || !tokenData || !bidData)
    throw new Error('Error fetching populating notification data')

  const userData = await getUserData(tokenData.owner)
  const chainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug
  const bidAmount = formatEther(bidData.amount)
  await pushNotification({
    title: `Token Claimed!`,
    body: `${userData.displayName} has claimed ${tokenData.name} for ${bidAmount} ETH`,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${daoId}/${tokenData.tokenId}`,
    embed: tokenData.image,
  })
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const chainId =
    CHAIN_ID_BY_SUBGRAPH?.[req.body.data_source as keyof typeof CHAIN_ID_BY_SUBGRAPH]
  console.log('req.body', req.body)
  try {
    if (req.body.entity === Entity.Auction) {
      if (!chainId) {
        throw new Error('Chain ID not found')
      }
      if (isBid(req.body)) {
        console.log('BID')
        handleNewBid(req.body, chainId)
      }

      if (isNewToken(req.body)) {
        console.log('NEW TOKEN')
        handleNewToken(req.body, chainId)
      }

      if (isSettled(req.body)) {
        console.log('SETTLED')
        handleIsSettled(req.body, chainId)
      }
    }
    res.status(200).json({ status: 'ok' })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: error?.message || 'Error ' })
  }
}
export default handler

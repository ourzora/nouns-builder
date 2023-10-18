import { getFetchableUrl } from 'ipfs-service'
import type { NextApiRequest, NextApiResponse } from 'next'
import { formatEther } from 'viem'

import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { auctionBidRequest } from 'src/data/subgraph/requests/auctionBid'
import { AuctionEvent, ProposalEvent } from 'src/typings/pushWebhookTypes'
import {
  CHAIN_ID_BY_SUBGRAPH,
  Entity,
  getDaoData,
  getTokenData,
  getUserData,
  isBid,
  isNewToken,
  isProposalCanceled,
  isProposalCreate,
  isProposalExecuted,
  isProposalQueued,
  isProposalVetoed,
  isSettled,
  pushNotification,
} from 'src/utils/pushWebhook'

/**
 * Corrects the hexadecimal string prefixes in the object received from the Subgraph API.
 * Due to a known issue with the Subgraph API, hexadecimal strings are sometimes returned with an incorrect '\\x' prefix.
 * This utility function iterates over a shallow object and corrects these prefixes to the standard '0x' used in hexadecimal notation.
 * Note: This function only checks the first level of object properties and expects a shallow data structure.
 */
const correctHexInShallowObject = (obj: Record<string, any>) => {
  let correctedObject: Record<string, any> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string' && value.startsWith('\\x')) {
      correctedObject[key] = '0x' + value.substring(2)
    } else {
      correctedObject[key] = value // Keep the original value if no correction is needed
    }
  }

  return correctedObject
}

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
    embed: getFetchableUrl(tokenData.image),
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
    embed: getFetchableUrl(tokenData.image),
  })
}

const handleIsSettled = async (body: AuctionEvent, chainId: number) => {
  const daoId = body?.data?.new?.dao
  const tokenId = body?.data?.new?.token
  const bidId = body?.data?.new?.highest_bid

  if (!daoId || !tokenId) {
    console.log(`daoId: ${daoId}, tokenId: ${tokenId}`)
    throw new Error('daoId tokenId not found')
  }

  if (!bidId) {
    // since no one is claiming this token, we don't need to send a notification
    return
  }

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
    embed: getFetchableUrl(tokenData.image),
  })
}

const handleProposalCreate = async (body: ProposalEvent, chainId: number) => {
  const proposaldata = correctHexInShallowObject(body.data.new)
  const { proposer, proposal_number, title } = proposaldata
  const daoId = body.data.new.dao

  const [proposerData, daoData] = await Promise.all([
    getUserData(proposer),
    getDaoData(daoId, chainId),
  ])

  if (!proposerData || !daoData) throw new Error('Error populating notification data')

  const chainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug

  await pushNotification({
    title: `${proposerData.displayName} Submitted a New Proposal at ${daoData.name}`,
    body: `Proposal #${proposal_number}: "${title}" has been submitted`,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${daoId}/vote/${proposal_number}`,
    embed: getFetchableUrl(daoData.contractImage),
  })
}

const handleProposalCanceled = async (body: ProposalEvent, chainId: number) => {}

// user submitted proposal

// canceled proposal

// queued proposal

// executed proposal

// vetoed proposal

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, headers } = req

  const webhookSecret = headers['goldsky-webhook-secret'] as string

  const isAuthrorized = process.env.WEBHOOK_KEYS?.split(':')?.includes?.(webhookSecret)

  const chainId =
    CHAIN_ID_BY_SUBGRAPH?.[body.data_source as keyof typeof CHAIN_ID_BY_SUBGRAPH]

  if (!isAuthrorized) throw new Error('Unauthorized Request')

  try {
    if (body.entity === Entity.Auction) {
      if (!chainId) {
        throw new Error('Chain ID not found')
      }
      if (isBid(body)) {
        console.log('BID')
        handleNewBid(body, chainId)
      }

      if (isNewToken(body)) {
        console.log('NEW TOKEN')
        handleNewToken(body, chainId)
      }

      if (isSettled(body)) {
        console.log('SETTLED')
        handleIsSettled(body, chainId)
      }
    }

    if (body.entity === Entity.Proposal) {
      if (isProposalCreate(body)) {
        console.log('PROPOSAL CREATE')
        handleProposalCreate(body, chainId)
      }
      if (isProposalVetoed(body)) {
        console.log('PROPOSAL VETOED')
      }
      if (isProposalExecuted(body)) {
        console.log('PROPOSAL EXECUTED')
      }
      if (isProposalCanceled(body)) {
        console.log('PROPOSAL CANCELLED')
      }
      if (isProposalQueued(body)) {
        console.log('PROPOSAL QUEUED')
      }
    }
    res.status(200).json({ status: 'ok' })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: error?.message || 'Error ' })
  }
}
export default handler

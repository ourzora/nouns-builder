import { getFetchableUrl } from 'ipfs-service'
import type { NextApiRequest, NextApiResponse } from 'next'
import { formatEther } from 'viem'

import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { auctionBidRequest } from 'src/data/subgraph/requests/auctionBid'
import { getProposal } from 'src/data/subgraph/requests/proposalQuery'
import { AuctionEvent, ProposalEvent, VoteEvent } from 'src/typings/pushWebhookTypes'
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

const handleProposalStateChange = async ({
  body,
  chainId,
  title,
  textBody,
}: {
  body: ProposalEvent
  chainId: number
  title: string
  textBody: string
}) => {
  const proposaldata = correctHexInShallowObject(body.data.new)
  const { proposal_number } = proposaldata
  const daoId = body.data.new.dao

  const daoData = await getDaoData(daoId, chainId)

  if (!daoData) throw new Error('Error populating notification data')

  const chainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug

  await pushNotification({
    title,
    body: textBody,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${daoId}/vote/${proposal_number}`,
    embed: getFetchableUrl(daoData.contractImage),
  })
}

const handleProposalCancelled = async (body: ProposalEvent, chainId: number) => {
  const { proposal_number, title } = body?.data?.new || {}
  return handleProposalStateChange({
    body,
    chainId,
    title: `Proposal #${proposal_number} Canceled`,
    textBody: `Proposal #${proposal_number}: "${title}" has been canceled`,
  })
}

const handleProposalQueued = async (body: ProposalEvent, chainId: number) => {
  const { proposal_number, title } = body?.data?.new || {}
  return handleProposalStateChange({
    body,
    chainId,
    title: `Proposal #${proposal_number} Queued`,
    textBody: `Proposal #${proposal_number}: "${title}" has been queued`,
  })
}

const handleProposalExecuted = async (body: ProposalEvent, chainId: number) => {
  const { proposal_number, title } = body?.data?.new || {}
  return handleProposalStateChange({
    body,
    chainId,
    title: `Proposal #${proposal_number} Executed`,
    textBody: `Proposal #${proposal_number}: "${title}" has been executed`,
  })
}

const handleProposalVetoed = async (body: ProposalEvent, chainId: number) => {
  const { proposal_number, title } = body?.data?.new || {}

  return handleProposalStateChange({
    body,
    chainId,
    title: `Proposal #${proposal_number} Vetoed`,
    textBody: `Proposal #${proposal_number}: "${title}" has been vetoed`,
  })
}

const handleVote = async (body: VoteEvent, chainId: number) => {
  const { proposal, voter, reason, support, weight } =
    correctHexInShallowObject(body?.data?.new) || {}

  const [proposalData, voterData] = await Promise.all([
    getProposal(chainId, proposal),
    getUserData(voter),
  ])

  const daoData = await getDaoData(
    proposalData?.dao?.tokenAddress?.toLowerCase?.(),
    chainId
  )
  if (!voterData || !daoData || !proposalData)
    throw new Error('Error populating notification data')

  const chainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug

  await pushNotification({
    title: `${voterData.displayName} Voted '${support}' on Proposal #${proposalData.proposalNumber}`,
    body: `
DAO: ${daoData.name}
Voting Weight: ${weight}
Reason: ${reason || 'No reason provided'}
    `,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${proposalData.dao.tokenAddress}/vote/${proposalData.proposalNumber}`,
    embed: getFetchableUrl(daoData.contractImage),
  })
}

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
        handleProposalVetoed(body, chainId)
      }
      if (isProposalExecuted(body)) {
        console.log('PROPOSAL EXECUTED')
        handleProposalExecuted(body, chainId)
      }
      if (isProposalCanceled(body)) {
        console.log('PROPOSAL CANCELLED')
        handleProposalCancelled(body, chainId)
      }
      if (isProposalQueued(body)) {
        console.log('PROPOSAL QUEUED')
        handleProposalQueued(body, chainId)
      }
    }
    if (body.entity === Entity.Vote) {
      console.log('VOTE')
      handleVote(body, chainId)
    }

    res.status(200).json({ status: 'ok' })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: error?.message || 'Error ' })
  }
}
export default handler

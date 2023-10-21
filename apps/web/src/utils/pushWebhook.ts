import { PushAPI } from '@pushprotocol/restapi'
import { ENV } from '@pushprotocol/restapi/src/lib/constants'
import { formatEther } from 'ethers/lib/utils'
import { getFetchableUrl } from 'ipfs-service'
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli } from 'viem/chains'

import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { getEventUsers } from 'src/data/notifsHasura/actions/getEvent'
import { SDK } from 'src/data/subgraph/client'
import { auctionBidRequest } from 'src/data/subgraph/requests/auctionBid'
import { getProposal } from 'src/data/subgraph/requests/proposalQuery'
import { AddressType, CHAIN_ID } from 'src/typings'
import {
  AuctionEvent,
  NotificationType,
  OP,
  ProposalEvent,
  VoteEvent,
} from 'src/typings/pushWebhookTypes'

import { getEnsName } from './ens'
import { walletSnippet } from './helpers'

// *** CONSTANTS ***

export enum DataSource {
  Goerli = 'nouns-builder-goerli-testnet/1.0.0',
}

export enum Entity {
  Auction = 'auction',
  Proposal = 'proposal',
  Vote = 'proposal_vote',
}

const ALCHEMY_URL = `https://eth-goerli.g.alchemy.com/v2/${process.env.PRIVATE_ALCHEMY_ID}`

export const CHAIN_ID_BY_SUBGRAPH: Record<string, CHAIN_ID> = {
  [DataSource.Goerli]: 5,
}

// *** EVENT SELECTORS ***
export const isBid = (body: any) => {
  const { op, data } = body
  return (
    op === OP.INSERT &&
    data.old === null &&
    data.new.settled === false &&
    typeof data.new.highest_bid === 'string'
  )
}
export const isSettled = (body: any) => {
  const { op, data } = body
  return op === OP.INSERT && data.old === null && data.new.settled === true
}

export const isNewToken = (body: any) => {
  const { op, data } = body
  return (
    op === OP.INSERT &&
    data.old === null &&
    data.new.highest_bid === null &&
    data.new.settled === false
  )
}

export const isProposalCreate = (body: any) => {
  const { op, data } = body
  return (
    op === OP.INSERT &&
    data.old === null &&
    data.new.queued === false &&
    data.new.canceled === false &&
    data.new.executed === false &&
    data.new.vetoed === false &&
    data.new.for_votes === 0 &&
    data.new.against_votes === 0 &&
    data.new.abstain_votes === 0
  )
}

export const isProposalVetoed = (body: any) => {
  const { op, data } = body
  return op === OP.INSERT && data.old === null && data.new.vetoed === true
}

export const isProposalExecuted = (body: any) => {
  const { op, data } = body
  return op === OP.INSERT && data.old === null && data.new.executed === true
}

export const isProposalCanceled = (body: any) => {
  const { op, data } = body
  return op === OP.INSERT && data.old === null && data.new.canceled === true
}

export const isProposalQueued = (body: any) => {
  const { op, data } = body
  return (
    op === OP.INSERT &&
    data.old === null &&
    data.new.queued === true &&
    data.new.executed === false &&
    data.new.vetoed === false
  )
}

// *** DATA FETCHING ***

export const getDaoData = async (daoId: string, chainId: number) => {
  const dao = await SDK.connect(chainId)
    .daoOGMetadata({
      tokenAddress: daoId.toLowerCase(),
    })
    .then((x) => x.dao)
  return dao
}

export const getUserData = async (address: string) => {
  const ensName = await getEnsName(address)

  return { displayName: ensName ? ensName : walletSnippet(address, 6), address }
}

export const getTokenData = async (auctionId: string, chainId: number) => {
  const token = await SDK.connect(chainId)
    .token({
      id: auctionId,
    })
    .then((x) => x.token)
  return token
}

// *** NOTIFICATION TEMPLATE ***

export const getNotificationsAccount = async () => {
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

  return notifAccount
}

export const getSubscribers = async () => {
  const notifAccount = await getNotificationsAccount()
  return await notifAccount.channel.info()
}

export const pushNotification = async ({
  title,
  body,
  cta,
  embed,
  eventId,
}: {
  title: string
  body: string
  cta: string
  embed?: string
  eventId: string
}) => {
  const notifAccount = await getNotificationsAccount()
  const subset = await getEventUsers(eventId)

  if (!subset.length) return console.log('No users to notify')

  const sendNotifRes = await notifAccount.channel.send(subset, {
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

export const createEventId = (
  daoAddress: AddressType,
  chainId: CHAIN_ID,
  eventType: NotificationType
) => `${eventType}:${chainId}:${daoAddress}`

export const parseEventId = (eventId: string) => {
  const [eventType, chainId, daoAddress] = eventId.split(':')
  return {
    eventType: eventType as NotificationType,
    chainId: Number(chainId) as CHAIN_ID,
    daoAddress: daoAddress as AddressType,
  }
}

// PUSH EVENTS

export const handleNewToken = async (body: any, chainId: number) => {
  const daoId = body?.data?.new?.dao
  const tokenId = body?.data?.new?.token
  if (!daoId || !tokenId) throw new Error('daoId or tokenId not found')

  const [tokenData, daoData] = await Promise.all([
    getTokenData(tokenId, chainId),
    getDaoData(daoId, chainId),
  ])

  if (!daoData || !tokenData) throw new Error('daoData not found')

  const chainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug
  const eventId = createEventId(daoId, chainId, NotificationType.Auction)

  await pushNotification({
    title: `New Token available for auction at ${daoData.name}`,
    body: `${tokenData.name} is up for auction!`,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${daoId}/${tokenData.tokenId}`,
    embed: getFetchableUrl(tokenData.image),
    eventId,
  })
}

export const handleNewBid = async (body: any, chainId: number) => {
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
  const eventId = createEventId(daoId, chainId, NotificationType.Auction)

  await pushNotification({
    title: `New bid on ${tokenData.name}!`,
    body: `${userData.displayName} has placed on ${tokenData.name} for ${bidAmount} ETH `,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${daoId}/${tokenData.tokenId}`,
    embed: getFetchableUrl(tokenData.image),
    eventId,
  })
}

export const handleIsSettled = async (body: AuctionEvent, chainId: number) => {
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
  const eventId = createEventId(daoId as AddressType, chainId, NotificationType.Auction)

  await pushNotification({
    title: `Token Claimed!`,
    body: `${userData.displayName} has claimed ${tokenData.name} for ${bidAmount} ETH`,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${daoId}/${tokenData.tokenId}`,
    embed: getFetchableUrl(tokenData.image),
    eventId,
  })
}

export const handleProposalCreate = async (body: ProposalEvent, chainId: number) => {
  const proposaldata = correctHexInShallowObject(body.data.new)
  const { proposer, proposal_number, title } = proposaldata
  const daoId = body.data.new.dao

  const [proposerData, daoData] = await Promise.all([
    getUserData(proposer),
    getDaoData(daoId, chainId),
  ])

  if (!proposerData || !daoData) throw new Error('Error populating notification data')

  const chainSlug = PUBLIC_ALL_CHAINS.find((chain) => chain.id === chainId)?.slug
  const eventId = createEventId(
    daoId as AddressType,
    chainId,
    NotificationType.Governance
  )
  await pushNotification({
    title: `${proposerData.displayName} Submitted a New Proposal at ${daoData.name}`,
    body: `Proposal #${proposal_number}: "${title}" has been submitted`,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${daoId}/vote/${proposal_number}`,
    embed: getFetchableUrl(daoData.contractImage),
    eventId,
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
  const eventId = createEventId(
    daoId as AddressType,
    chainId,
    NotificationType.Governance
  )
  await pushNotification({
    title,
    body: textBody,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${daoId}/vote/${proposal_number}`,
    embed: getFetchableUrl(daoData.contractImage),
    eventId,
  })
}

export const handleProposalCancelled = async (body: ProposalEvent, chainId: number) => {
  const { proposal_number, title } = body?.data?.new || {}
  return handleProposalStateChange({
    body,
    chainId,
    title: `Proposal #${proposal_number} Canceled`,
    textBody: `Proposal #${proposal_number}: "${title}" has been canceled`,
  })
}

export const handleProposalQueued = async (body: ProposalEvent, chainId: number) => {
  const { proposal_number, title } = body?.data?.new || {}
  return handleProposalStateChange({
    body,
    chainId,
    title: `Proposal #${proposal_number} Queued`,
    textBody: `Proposal #${proposal_number}: "${title}" has been queued`,
  })
}

export const handleProposalExecuted = async (body: ProposalEvent, chainId: number) => {
  const { proposal_number, title } = body?.data?.new || {}
  return handleProposalStateChange({
    body,
    chainId,
    title: `Proposal #${proposal_number} Executed`,
    textBody: `Proposal #${proposal_number}: "${title}" has been executed`,
  })
}

export const handleProposalVetoed = async (body: ProposalEvent, chainId: number) => {
  const { proposal_number, title } = body?.data?.new || {}

  return handleProposalStateChange({
    body,
    chainId,
    title: `Proposal #${proposal_number} Vetoed`,
    textBody: `Proposal #${proposal_number}: "${title}" has been vetoed`,
  })
}

export const handleVote = async (body: VoteEvent, chainId: number) => {
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
  const eventId = createEventId(
    proposalData.dao.tokenAddress as AddressType,
    chainId,
    NotificationType.Governance
  )
  await pushNotification({
    title: `${voterData.displayName} Voted '${support}' on Proposal #${proposalData.proposalNumber}`,
    body: `
DAO: ${daoData.name}
Voting Weight: ${weight}
Reason: ${reason || 'No reason provided'}
    `,
    cta: `https://testnet.nouns.build/dao/${chainSlug}/${proposalData.dao.tokenAddress}/vote/${proposalData.proposalNumber}`,
    embed: getFetchableUrl(daoData.contractImage),
    eventId,
  })
}

// WEBHOOK FORMATTING

/**
 * Corrects the hexadecimal string prefixes in the object received from the Subgraph API.
 * Due to a known issue with the Subgraph API, hexadecimal strings are sometimes returned with an incorrect '\\x' prefix.
 * This utility function iterates over a shallow object and corrects these prefixes to the standard '0x' used in hexadecimal notation.
 * Note: This function only checks the first level of object properties and expects a shallow data structure.
 */
export const correctHexInShallowObject = (obj: Record<string, any>) => {
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

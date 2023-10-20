import { PushAPI } from '@pushprotocol/restapi'
import { ENV } from '@pushprotocol/restapi/src/lib/constants'
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { goerli } from 'viem/chains'

import { SDK } from 'src/data/subgraph/client'
import { AddressType, CHAIN_ID } from 'src/typings'
import {
  AuctionEvent,
  NotificationType,
  OP,
  ProposalEvent,
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

export const CHAIN_ID_BY_SUBGRAPH: Record<string, number> = {
  [DataSource.Goerli]: 5,
}

// *** TYPE GUARDS ***
export const isBid = (body: any): body is AuctionEvent => {
  const { op, data } = body
  return (
    op === OP.INSERT &&
    data.old === null &&
    data.new.settled === false &&
    typeof data.new.highest_bid === 'string'
  )
}
export const isSettled = (body: any): body is AuctionEvent => {
  const { op, data } = body
  return op === OP.INSERT && data.old === null && data.new.settled === true
}

export const isNewToken = (body: any): body is AuctionEvent => {
  const { op, data } = body
  return (
    op === OP.INSERT &&
    data.old === null &&
    data.new.highest_bid === null &&
    data.new.settled === false
  )
}

export const isProposalCreate = (body: any): body is ProposalEvent => {
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

export const isProposalVetoed = (body: any): body is ProposalEvent => {
  const { op, data } = body
  return op === OP.INSERT && data.old === null && data.new.vetoed === true
}

export const isProposalExecuted = (body: any): body is ProposalEvent => {
  const { op, data } = body
  return op === OP.INSERT && data.old === null && data.new.executed === true
}

export const isProposalCanceled = (body: any): body is ProposalEvent => {
  const { op, data } = body
  return op === OP.INSERT && data.old === null && data.new.canceled === true
}

export const isProposalQueued = (body: any): body is ProposalEvent => {
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
}: {
  title: string
  body: string
  cta: string
  embed?: string
}) => {
  const notifAccount = await getNotificationsAccount()
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

export const createEventId = (
  daoAddress: AddressType,
  chainId: CHAIN_ID,
  eventType: NotificationType
) => `${eventType}:${chainId}:${daoAddress}`

export const parseEventId = (eventId: string) => {
  const [eventType, chainId, daoAddress] = eventId.split(':')
  return { eventType, chainId: Number(chainId), daoAddress }
}

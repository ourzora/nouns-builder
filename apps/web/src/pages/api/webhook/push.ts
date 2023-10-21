import type { NextApiRequest, NextApiResponse } from 'next'

import { CHAIN_ID } from 'src/typings'
import { AuctionEvent, ProposalEvent } from 'src/typings/pushWebhookTypes'
import {
  CHAIN_ID_BY_SUBGRAPH,
  Entity,
  handleIsSettled,
  handleNewBid,
  handleNewToken,
  handleProposalCancelled,
  handleProposalCreate,
  handleProposalExecuted,
  handleProposalQueued,
  handleProposalVetoed,
  handleVote,
  isBid,
  isNewToken,
  isProposalCanceled,
  isProposalCreate,
  isProposalExecuted,
  isProposalQueued,
  isProposalVetoed,
  isSettled,
} from 'src/utils/pushWebhook'

const LOGGER = false

const handleAuctionEvent = (body: AuctionEvent, chainId: CHAIN_ID) => {
  if (isBid(body)) {
    LOGGER && console.log('BID')
    handleNewBid(body, chainId)
  } else if (isNewToken(body)) {
    LOGGER && console.log('NEW TOKEN')
    handleNewToken(body, chainId)
  } else if (isSettled(body)) {
    LOGGER && console.log('SETTLED')
    handleIsSettled(body, chainId)
  } else {
    console.warn('Unknown Auction Event', body)
  }
}

const handleProposalEvent = (body: ProposalEvent, chainId: CHAIN_ID) => {
  if (isProposalCreate(body)) {
    LOGGER && console.log('PROPOSAL CREATE')
    return handleProposalCreate(body, chainId)
  } else if (isProposalVetoed(body)) {
    LOGGER && console.log('PROPOSAL VETOED')
    return handleProposalVetoed(body, chainId)
  } else if (isProposalExecuted(body)) {
    LOGGER && console.log('PROPOSAL EXECUTED')
    return handleProposalExecuted(body, chainId)
  } else if (isProposalCanceled(body)) {
    LOGGER && console.log('PROPOSAL CANCELLED')
    handleProposalCancelled(body, chainId)
  } else if (isProposalQueued(body)) {
    LOGGER && console.log('PROPOSAL QUEUED')
    handleProposalQueued(body, chainId)
  } else {
    console.warn('Unknown Proposal Event', body)
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, headers } = req

  const webhookSecret = headers['goldsky-webhook-secret'] as string

  try {
    const isAuthorized = process.env.WEBHOOK_KEYS?.split(':')?.includes?.(webhookSecret)
    if (!isAuthorized) throw new Error('Unauthorized Request')

    const chainId =
      CHAIN_ID_BY_SUBGRAPH?.[body.data_source as keyof typeof CHAIN_ID_BY_SUBGRAPH]
    if (!chainId) {
      throw new Error('Unable to derive chainId from subgraph entity')
    }
    if (body.entity === Entity.Auction) {
      handleAuctionEvent(body, chainId)
    } else if (body.entity === Entity.Proposal) {
      handleProposalEvent(body, chainId)
    } else if (body.entity === Entity.Vote) {
      LOGGER && console.log('VOTE')
      handleVote(body, chainId)
    } else {
      console.warn('Unknown Event', body)
    }

    res.status(200).json({ status: 'ok' })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: error?.message || 'Error ' })
  }
}
export default handler

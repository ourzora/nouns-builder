/** @jsxImportSource frog/jsx */
import { Frog } from 'frog'
import { handle } from 'frog/next'
import { isAddress, parseEther } from 'viem'

import { auctionAbi, governorAbi } from 'src/data/contract/abis'
import { AddressType, BytesType, CHAIN_ID } from 'src/typings'

const app = new Frog({
  title: 'Nouns Builder',
  basePath: '/api/frames',
})

app.transaction('/bid', async (c) => {
  try {
    const { inputText, req } = c
    const { chainId, auctionContract, tokenId, amount, referral } = req.query()

    if (!tokenId) return new Response('Invalid tokenId', { status: 400 })

    const tokenIdParsed = BigInt(tokenId)
    const chainIdParsed = parseInt(chainId)

    let bidAmount: bigint | undefined

    if (amount) bidAmount = parseEther(amount)
    else if (inputText) bidAmount = parseEther(inputText)

    if (!bidAmount) return new Response('Invalid bid amount', { status: 400 })

    if (
      chainIdParsed !== CHAIN_ID.OPTIMISM &&
      chainIdParsed !== CHAIN_ID.ZORA &&
      chainIdParsed !== CHAIN_ID.BASE
    )
      return new Response('Invalid chain id', { status: 400 })

    const contract = {
      abi: auctionAbi,
      chainId: `eip155:${chainIdParsed}`,
      to: auctionContract as AddressType,
    } as const

    if (referral) {
      if (!isAddress(referral)) return new Response('Invalid referral', { status: 400 })

      return c.contract({
        ...contract,
        functionName: 'createBidWithReferral',
        value: bidAmount,
        args: [tokenIdParsed, referral as AddressType],
      })
    }

    return c.contract({
      ...contract,
      functionName: 'createBid',
      value: bidAmount,
      args: [tokenIdParsed],
    })
  } catch (err) {
    return new Response((err as Error).message, { status: 500 })
  }
})

app.transaction('/vote', async (c) => {
  try {
    const { inputText, req } = c
    const { chainId, governorContract, support, proposalId, reason } = req.query()
    const chainIdParsed = parseInt(chainId)

    let reasonText
    if (reason) reasonText = reason
    else if (inputText) reasonText = inputText

    const supportParsed = BigInt(support)

    // 0 = Against, 1 = For, 2 = Abstain
    if (supportParsed !== 0n && supportParsed !== 1n && supportParsed !== 2n)
      return new Response('Invalid support value', { status: 400 })

    if (
      chainIdParsed !== CHAIN_ID.OPTIMISM &&
      chainIdParsed !== CHAIN_ID.ZORA &&
      chainIdParsed !== CHAIN_ID.BASE
    )
      return new Response('Invalid chain id', { status: 400 })

    const contract = {
      abi: governorAbi,
      chainId: `eip155:${chainIdParsed}`,
      to: governorContract as AddressType,
    } as const

    if (reasonText) {
      return c.contract({
        ...contract,
        functionName: 'castVoteWithReason',
        args: [proposalId as BytesType, supportParsed, reasonText],
      })
    }

    return c.contract({
      ...contract,
      functionName: 'castVote',
      args: [proposalId as BytesType, supportParsed],
    })
  } catch (err) {
    return new Response((err as Error).message, { status: 500 })
  }
})

export const GET = handle(app)
export const POST = handle(app)

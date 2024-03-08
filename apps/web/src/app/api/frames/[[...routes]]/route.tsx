/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/next'
import { isAddress, parseEther } from 'viem'

import { auctionAbi, governorAbi } from 'src/data/contract/abis'
import { AddressType, BytesType, CHAIN_ID } from 'src/typings'

const app = new Frog({
  basePath: '/api/frames',
})

app.frame('/place-bid', async (c) => {
  return c.res({
    image: (
      <div style={{ color: 'white', display: 'flex', fontSize: 60 }}>Place a bid</div>
    ),
    intents: [
      <TextInput placeholder="Enter your bid..." />,
      //@ts-ignore
      <Button.Transaction target="/bid?chainId=6453&auctionContract=0x8d133f423da7514c0cb5e27ef04afccd85115626">
        Bid
      </Button.Transaction>,
    ],
  })
})

app.transaction('/bid', async (c) => {
  try {
    console.log('here')
    const { inputText, req } = c
    const { chainId, auctionContract, amount, referral } = req.query()
    const chainIdParsed = parseInt(chainId)

    if (!amount || !inputText) return new Response('Invalid bid amount', { status: 400 })

    if (
      chainIdParsed !== CHAIN_ID.OPTIMISM &&
      chainIdParsed !== CHAIN_ID.ZORA &&
      chainIdParsed !== CHAIN_ID.BASE
    )
      return new Response('Invalid chain id', { status: 400 })

    const bidAmount = parseEther(amount ? amount : inputText)

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
        args: [BigInt(bidAmount), referral as AddressType],
      })
    }

    return c.contract({
      ...contract,
      functionName: 'createBid',
      args: [BigInt(bidAmount)],
    })
  } catch (err) {
    return new Response((err as Error).message, { status: 500 })
  }
})

app.transaction('/vote', async (c) => {
  try {
    const { inputText, req } = c
    const { chainId, governorContract, support, proposalId } = req.query()
    const chainIdParsed = parseInt(chainId)

    const supportParsed = BigInt(support)

    if (supportParsed !== 1n && supportParsed !== 2n && supportParsed !== 3n)
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

    if (inputText) {
      return c.contract({
        ...contract,
        functionName: 'castVoteWithReason',
        args: [proposalId as BytesType, supportParsed, inputText],
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

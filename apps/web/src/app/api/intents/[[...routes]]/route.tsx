/** @jsxImportSource frog/jsx */
import { Frog } from 'frog'
import { handle } from 'frog/next'
import { readContracts } from 'wagmi/actions'

import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { auctionAbi } from 'src/data/contract/abis'
import { AddressType } from 'src/typings'

const app = new Frog({
  basePath: '/api/intents',
})

app.transaction('/bid', async (c) => {
  try {
    const { inputText, req } = c
    const { chainId, auctionContract, amount } = req.query()
    const chainIdParsed = parseInt(chainId)

    if (!amount || !inputText) return new Response('Invalid bid amount', { status: 400 })

    if (!PUBLIC_DEFAULT_CHAINS.find((x) => x.id === chainIdParsed))
      return new Response('Invalid chain id', { status: 400 })

    const contract = {
      abi: auctionAbi,
      chainId: chainIdParsed,
      address: auctionContract as AddressType,
    }

    const minBid = await readContracts({
      contracts: [{ ...contract, functionName: 'auction' }],
    })

    const bidAmount = amount ? amount : inputText

    return c.contract({
      abi: auctionAbi,
      chainId: `eip155:${chainIdParsed}`,
      functionName: 'createBid',
      args: [BigInt(bidAmount)],
      to: auctionContract as AddressType,
    })
  } catch (err) {
    return new Response((err as Error).message, { status: 400 })
  }
})

export const GET = handle(app)
export const POST = handle(app)

/** @jsxImportSource frog/jsx */
import { Button, Frog } from 'frog'
import { handle } from 'frog/next'
import { isAddress, parseEther } from 'viem'
import { SDK } from 'src/data/subgraph/client'
import { auctionAbi, governorAbi, metadataAbi } from 'src/data/contract/abis'
import type { AddressType, BytesType } from 'src/typings'

import { OrderDirection, Token_OrderBy } from 'src/data/subgraph/sdk.generated'

import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
const enum CHAIN_ID {
  ETHEREUM = 1,
  SEPOLIA = 11155111,
  OPTIMISM = 10,
  OPTIMISM_SEPOLIA = 11155420,
  BASE = 8453,
  BASE_SEPOLIA = 84532,
  ZORA = 7777777,
  ZORA_SEPOLIA = 999999999,
  FOUNDRY = 31337,
}

export const CHAIN_NAME_TO_ID: { [key: string]: CHAIN_ID } = {
  ethereum: CHAIN_ID.ETHEREUM,
  sepolia: CHAIN_ID.SEPOLIA,
  optimism: CHAIN_ID.OPTIMISM,
  optimism_sepolia: CHAIN_ID.OPTIMISM_SEPOLIA,
  base: CHAIN_ID.BASE,
  base_sepolia: CHAIN_ID.BASE_SEPOLIA,
  zora: CHAIN_ID.ZORA,
  zora_sepolia: CHAIN_ID.ZORA_SEPOLIA,
  foundry: CHAIN_ID.FOUNDRY,
};

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
})



const app = new Frog({
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

app.frame("/auction", async (c) => {


  const chain = c.req.query('chain')

  const collectionAddress = c.req.query('collectionAddress');
  if (typeof chain !== "string" || typeof collectionAddress !== "string") {
    return new Response("chain or collection address missing", { status: 400 })
  }

  console.log({ chain })
  console.log({ collectionAddress })

  const chainId = CHAIN_NAME_TO_ID[chain.toLowerCase()]
  console.log({ chainId })

  const latestTokenId = await SDK.connect(chainId)
    .tokens({
      where: {
        dao: collectionAddress.toLowerCase(),
      },
      orderBy: Token_OrderBy.TokenId,
      orderDirection: OrderDirection.Desc,
      first: 1,
    })
    .then((x) => (x.tokens.length > 0 ? x.tokens[0].tokenId : undefined))


  const token = await SDK.connect(chainId)
    .tokenWithDao({
      id: `${collectionAddress.toLowerCase()}:${latestTokenId}`,
    })
    .then((x) => x.token)
  console.log(token?.image)

  if (typeof token?.image !== "string") {
    return new Response("could not get token image", { status: 400 })
  }
  //  const baseParams = { address: token?.dao.metadataAddress, abi: metadataAbi, chainId: chainId }
  // const tokenImg = await publicClient.readContract({
  // ...baseParams,
  //functionName: 'tokenURI',
  //args: [latestTokenId]

  //})
  //console.log({ tokenImg })
  return c.res({
    image: token.image,
    intents: [
      <Button value="apple">Apple</Button>,
      <Button value="banana">Banana</Button>,
      <Button value="mango">Mango</Button>
    ]
  })
})

export const GET = handle(app)
export const POST = handle(app)

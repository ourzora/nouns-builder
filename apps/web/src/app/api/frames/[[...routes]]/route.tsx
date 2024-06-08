/** @jsxImportSource frog/jsx */
import { Button, Frog, TextInput } from 'frog'
import { handle } from 'frog/next'
import { http, isAddress, parseEther } from 'viem'
import { optimism, base, zora, mainnet, } from 'viem/chains'
import { SDK } from 'src/data/subgraph/client'
import { auctionAbi, governorAbi } from 'src/data/contract/abis'
import { CHAIN_ID, CHAIN_NAME_TO_ID, type AddressType, type BytesType } from 'src/typings'
import { createPublicClient } from 'viem';
import { OrderDirection, Token_OrderBy } from 'src/data/subgraph/sdk.generated'

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


app.transaction('/start', async (c) => {
  const { req } = c
  const { chainId, auctionContract, tokenId, amount, referral } = req.query()

  if (!tokenId) return new Response('Invalid tokenId', { status: 400 })

  const chainIdParsed = parseInt(chainId)

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


  return c.contract({ ...contract, functionName: "settleCurrentAndCreateNewAuction" })
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


app.frame("/landing", async (c) => {
  return c.res({
    image: (<div style={{ display: "flex", padding: "20px", color: "white" }}>Landing Page</div>),
    imageOptions: { width: 600, height: 600 },
    imageAspectRatio: "1:1",
    intents: [
      <Button
        action="/apples"
        value="red lady"
      >
        Apple
      </Button>,
    ]
  })
})

app.frame("/auction", async (c) => {

  const chain = c.req.query('chain')

  const collectionAddress = c.req.query('collectionAddress');
  if (typeof chain !== "string" || typeof collectionAddress !== "string") {
    return new Response("chain or collection address missing", { status: 400 })
  }
  const chainId = CHAIN_NAME_TO_ID[chain.toLowerCase()]

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


  function getChain(chain: number) {
    switch (chain) {
      case 1: {
        return mainnet
      }
      case 8453: {
        return base
      }
      case 10: {
        return optimism
      }
      case 7777777: {
        return zora
      }
    }
  }

  const curChain = getChain(chainId)
  const pubClient = createPublicClient({
    chain: curChain,
    transport: http()
  })
  const auctionAddress = token.dao.auctionAddress as `0x${string}`
  const auctionInfo = await pubClient.readContract({
    address: auctionAddress,
    abi: auctionAbi,
    functionName: "auction"
  })


  const currentTime = Math.floor(Date.now() / 1000);
  const endTime = auctionInfo[4]

  console.log(currentTime, "current time", endTime, "end time");

  if (currentTime > endTime) {
    return c.res({
      image: (
        <div style={{ height: "100%", width: "100%", backgroundColor: "blue", padding: "30px" }}>Start Auction</div>
      ),
      imageOptions: { width: 600, height: 600 },
      imageAspectRatio: '1:1',
      intents: [
        <Button.Transaction target={`/start?chainId=${chainId}&auctionContract=${token.dao.auctionAddress}&tokenId=${latestTokenId}`}>Start Auction</Button.Transaction>
      ]
    })
  }
  return c.res({
    image: token.image,
    imageOptions: { width: 600, height: 600 },
    imageAspectRatio: '1:1',
    intents: [
      <TextInput placeholder="Value (ETH)" />,
      <Button.Transaction target={`/bid?chainId=${chainId}&auctionContract=${token.dao.auctionAddress}&tokenId=${latestTokenId}`}>Bid</Button.Transaction>,
    ]
  })
})

export const GET = handle(app)
export const POST = handle(app)

import { formatEther } from 'viem'
import { useReadContract } from 'wagmi'

import { auctionAbi, tokenAbi } from 'src/data/contract/abis'
import { AddressType, CHAIN_ID } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

interface useDaoCardProps {
  collectionAddress: string
  auctionAddress: string
  chainId: CHAIN_ID
}

export const useDaoFeedCard = ({
  collectionAddress,
  auctionAddress,
  chainId,
}: useDaoCardProps) => {
  const { data: auction } = useReadContract({
    address: auctionAddress as AddressType,
    chainId,
    abi: auctionAbi,
    functionName: 'auction',
  })

  const [tokenId, highestBid, _highestBidder, _startTime, endTime] = unpackOptionalArray(
    auction,
    6
  )

  const { data: token } = useReadContract({
    address: collectionAddress as AddressType,
    chainId,
    abi: tokenAbi,
    functionName: 'tokenURI',
    args: [tokenId!],
    query: {
      enabled: !!tokenId,
    },
  })

  const decode = (token?: string) => {
    if (!token) return null

    const decoded = Buffer.from(token?.substring(29, token?.length) as string, 'base64')

    let data
    try {
      data = JSON.parse(decoded.toString())
    } catch (e) {
      console.error(e)
      data = null
    }

    return data
  }

  return {
    highestBid: highestBid ? formatEther(highestBid) : undefined,
    tokenUri: decode(token),
    endTime: endTime || 0,
    tokenId: tokenId,
  }
}

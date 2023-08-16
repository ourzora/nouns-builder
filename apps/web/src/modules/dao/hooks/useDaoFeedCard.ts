import { formatEther } from 'viem'
import { useContractRead } from 'wagmi'

import { auctionAbi, tokenAbi } from 'src/data/contract/abis'
import { useChainStore } from 'src/stores/useChainStore'
import { AddressType } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

interface useDaoCardProps {
  collectionAddress: string
  auctionAddress: string
}

export const useDaoFeedCard = ({
  collectionAddress,
  auctionAddress,
}: useDaoCardProps) => {
  const chain = useChainStore((x) => x.chain)
  const { data: auction } = useContractRead({
    address: auctionAddress as AddressType,
    chainId: chain.id,
    abi: auctionAbi,
    functionName: 'auction',
  })

  const [tokenId, highestBid, highestBidder, startTime, endTime] = unpackOptionalArray(
    auction,
    6
  )

  const { data: token } = useContractRead({
    address: collectionAddress as AddressType,
    chainId: chain.id,
    abi: tokenAbi,
    functionName: 'tokenURI',
    args: [tokenId!],
    enabled: !!tokenId,
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

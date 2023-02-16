import { BigNumber } from 'ethers'
import { useRouter } from 'next/router'
import { useContractEvent } from 'wagmi'
import { readContract } from '@wagmi/core'
import { useDaoStore } from 'src/stores/index'
import { useSWRConfig } from 'swr'
import SWR_KEYS from 'src/constants/swrKeys'
import getBids from 'src/utils/getBids'
import { auctionAbi } from 'src/constants/abis'

const useAuction = ({
  collection,
  tokenId,
  isTokenActiveAuction,
}: {
  collection: string
  tokenId: string
  isTokenActiveAuction: boolean
}) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { auction } = useDaoStore((state) => state.addresses)

  useContractEvent({
    address: isTokenActiveAuction ? auction : undefined,
    abi: auctionAbi,
    eventName: 'AuctionCreated',
    listener: async (id) => {
      const tokenId = BigNumber.from(id._hex).toNumber()

      await mutate([SWR_KEYS.AUCTION, auction], () =>
        readContract({
          abi: auctionAbi,
          address: auction as string,
          functionName: 'auction',
        })
      )

      await mutate([SWR_KEYS.AUCTION_BIDS, auction, tokenId], () =>
        getBids(auction as string, tokenId)
      )

      await router.push(`/dao/${collection}/${tokenId}`)
    },
  })

  useContractEvent({
    address: isTokenActiveAuction ? auction : undefined,
    abi: auctionAbi,
    eventName: 'AuctionBid',
    listener: async () => {
      await mutate([SWR_KEYS.AUCTION, auction], () =>
        readContract({
          abi: auctionAbi,
          address: auction as string,
          functionName: 'auction',
        })
      )

      await mutate([SWR_KEYS.AUCTION_BIDS, auction, tokenId], () =>
        getBids(auction as string, tokenId)
      )
    },
  })
}

export default useAuction

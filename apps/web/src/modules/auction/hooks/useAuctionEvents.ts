import { readContract } from '@wagmi/core'
import { BigNumber } from 'ethers'
import { useRouter } from 'next/router'
import { useDaoStore } from 'src/stores'
import { AddressType } from 'src/typings'
import { useSWRConfig } from 'swr'
import { useContractEvent } from 'wagmi'

import { auctionAbi } from 'src/data/contract/abis'
import getBids from 'src/data/contract/requests/getBids'

import SWR_KEYS from 'src/constants/swrKeys'

export const useAuctionEvents = ({
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
          address: auction as AddressType,
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
          address: auction as AddressType,
          functionName: 'auction',
        })
      )

      await mutate([SWR_KEYS.AUCTION_BIDS, auction, tokenId], () =>
        getBids(auction as string, tokenId)
      )
    },
  })
}

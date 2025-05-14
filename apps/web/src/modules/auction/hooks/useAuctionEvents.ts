import { useRouter } from 'next/router'
import { useSWRConfig } from 'swr'
import { useContractEvent } from 'wagmi'
import { readContract } from 'wagmi/actions'

import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi } from 'src/data/contract/abis'
import { getBids } from 'src/data/subgraph/requests/getBids'
import { awaitSubgraphSync } from 'src/data/subgraph/requests/sync'
import { useDaoStore } from 'src/modules/dao'
import { AddressType, CHAIN_ID } from 'src/typings'

export const useAuctionEvents = ({
  chainId,
  collection,
  tokenId,
  isTokenActiveAuction,
}: {
  chainId: CHAIN_ID
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
    chainId,
    listener: async (logs) => {
      await awaitSubgraphSync(chainId, logs[0].blockNumber)

      await mutate([SWR_KEYS.AUCTION, chainId, auction], () =>
        readContract({
          abi: auctionAbi,
          address: auction as AddressType,
          chainId,
          functionName: 'auction',
        })
      )

      const tokenId = logs[0].args.tokenId as bigint

      await mutate([SWR_KEYS.AUCTION_BIDS, chainId, auction, tokenId], () =>
        getBids(chainId, collection, tokenId.toString())
      )

      await router.push(`/dao/${router.query.network}/${collection}/${tokenId}`)
    },
  })

  useContractEvent({
    address: isTokenActiveAuction ? auction : undefined,
    abi: auctionAbi,
    eventName: 'AuctionBid',
    listener: async (logs) => {
      await awaitSubgraphSync(chainId, logs[0].blockNumber)

      await mutate([SWR_KEYS.AUCTION, chainId, auction], () =>
        readContract({
          abi: auctionAbi,
          address: auction as AddressType,
          chainId: chainId,
          functionName: 'auction',
        })
      )

      await mutate([SWR_KEYS.AUCTION_BIDS, chainId, auction, tokenId], () =>
        getBids(chainId, auction as string, tokenId)
      )
    },
  })
}

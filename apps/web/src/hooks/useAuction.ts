import { BigNumber } from 'ethers'
import { useRouter } from 'next/router'
import { Auction__factory } from 'src/constants/typechain'
import { useContractEvent } from 'src/hooks/useContractEvent'
import { useDaoStore } from 'src/stores/index'
import { getProvider } from 'src/utils/provider'
import { readAuctionContract } from 'src/utils/readAuctionContract'
import { useSWRConfig } from 'swr'
import SWR_KEYS from 'src/constants/swrKeys'
import { getBids } from './useBids'

const useAuction = ({
  auctionAddress,
  collection,
  tokenId,
  isTokenActiveAuction,
}: {
  auctionAddress: string
  collection: string
  tokenId: string | number
  isTokenActiveAuction: boolean
}) => {
  const router = useRouter()
  const { mutate } = useSWRConfig()
  const { auction, treasury } = useDaoStore((state) => state.addresses)

  const contract = Auction__factory.connect(auctionAddress, getProvider())

  useContractEvent({
    shouldAttach: isTokenActiveAuction,
    contract: contract,
    eventName: 'AuctionCreated',
    listener: async (id) => {
      const tokenId = BigNumber.from(id._hex).toNumber()

      await mutate([SWR_KEYS.AUCTION, auction, treasury], () =>
        readAuctionContract(auction as string, treasury as string)
      )

      await mutate([SWR_KEYS.AUCTION_BIDS, auction, tokenId], () =>
        getBids(auction as string, tokenId)
      )

      await router.push(`/dao/${collection}/${tokenId}`)
    },
  })

  useContractEvent({
    shouldAttach: isTokenActiveAuction,
    contract: contract,
    eventName: 'AuctionBid',
    listener: async () => {
      await mutate([SWR_KEYS.AUCTION, auction, treasury], () =>
        readAuctionContract(auction as string, treasury as string)
      )
      await mutate([SWR_KEYS.AUCTION_BIDS, auction, tokenId], () =>
        getBids(auction as string, tokenId)
      )
    },
  })
}

export default useAuction

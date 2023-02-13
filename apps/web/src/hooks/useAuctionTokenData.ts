import { useRouter } from 'next/router'
import { useDaoStore } from 'src/stores'
import { readAuctionContract } from 'src/utils/readAuctionContract'
import { getToken } from 'src/utils/readTokenContract'
import useSWR from 'swr'
import SWR_KEYS from 'src/constants/swrKeys'

export const useAuctionTokenData = ({
  collection,
  tokenId,
}: {
  collection: string
  tokenId: string
}) => {
  const { isReady } = useRouter()
  const addresses = useDaoStore((state) => state.addresses)

  const { data: token, error: tokenError } = useSWR(
    [SWR_KEYS.TOKEN, collection, tokenId],
    (_, collection, tokenId) => getToken(collection, Number(tokenId)),
    { revalidateOnFocus: true }
  )

  const { data: auction, error: auctionError } = useSWR(
    isReady && addresses.auction && addresses.treasury
      ? [SWR_KEYS.AUCTION, addresses?.auction, addresses?.treasury]
      : null,
    (_, auction, treasury) => readAuctionContract(auction, treasury),
    { revalidateOnFocus: true }
  )

  return {
    currentAuction: auction?.tokenId,
    currentToken: token?.id,
    endTime: auction?.endTime,
    settled: auction?.settled,
    highestBid: auction?.highestBid,
    highestBidder: auction?.highestBidder,
    tokenPrice: token?.price,
    tokenOwner: token?.owner,
    name: token?.name,
    mintDate: token?.mintDate,
    image: token?.image,
    isTokenActiveAuction: Number(tokenId) === auction?.tokenId,
    isLoading: (!token && !tokenError) || (!auction && !auctionError),
  }
}

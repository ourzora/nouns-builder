import { FetchSignerResult } from '@wagmi/core'
import { Auction__factory } from 'src/constants/typechain'
import { ethers } from 'ethers'
import { getProvider } from './provider'

export type AuctionResponse = {
  tokenId: number
  highestBid: string
  highestBidder: string
  startTime: number
  endTime: number
  settled: boolean
  auctionContractOwner: string
  initialized: boolean
}

export const readAuctionContract = async (
  auctionAddress: string,
  treasuryAddress: string,
  signer?: FetchSignerResult
): Promise<AuctionResponse> => {
  const auctionContract = Auction__factory.connect(auctionAddress, getProvider())

  const [auction, auctionContractOwner] = await Promise.all([
    auctionContract?.auction(),
    auctionContract.owner(),
  ])

  const tokenId: number = auction?.tokenId?.toNumber()
  const highestBid: string = auction?.highestBid.toHexString()
  const highestBidder: string = auction?.highestBidder
  const startTime: number = auction?.startTime
  const endTime: number = auction?.endTime
  const settled: boolean = auction?.settled

  const initialized: boolean =
    auction?.endTime !== 0 &&
    auction?.startTime !== 0 &&
    auctionContractOwner === treasuryAddress

  return {
    tokenId,
    highestBid,
    highestBidder,
    startTime,
    endTime,
    settled,
    auctionContractOwner,
    initialized,
  }
}

// only being used int the auction bid history modal right now
export const readAuctionEvents = async (
  auctionAddress: string,
  signer?: FetchSignerResult
) => {
  if (!auctionAddress) return null
  const auctionContract = Auction__factory.connect(auctionAddress, getProvider())

  // reading all 'AuctionBid' events from block 0 to latest block
  // an idea could be to get block number of previous tokens mint and start from there
  const auctionEvents = await auctionContract.queryFilter(
    'AuctionBid' as any,
    0,
    'latest'
  )
  const auctionEventsArray = auctionEvents.map((event) => {
    return {
      id: parseInt(event.args?.tokenId?._hex, 16),
      bidder: event.args?.bidder,
      amount: ethers.utils.formatEther(event.args?.amount),
      transactionHash: event.transactionHash,
    }
  })

  if (auctionEventsArray.length) {
    return auctionEventsArray
  } else {
    return null
  }
}

import { Auction } from 'src/constants/typechain'
import { BigNumber } from 'ethers'
import create from 'zustand'

interface AuctionProps {
  tokenId: BigNumber
  highestBid: BigNumber
  highestBidder: string
  startTime: number
  endTime: number
  settled: boolean
}

interface AuctionStoreProps {
  // can this be multiple addresses?
  auctionContractOwner: string
  setAuctionContractOwner: (owner: string) => void
  // the auction contract instance
  auctionContract: Auction | null
  setAuctionContract: (auctionContract: Auction | null) => void
  // minBidAmount on current auction
  minBidAmount: number | null
  setMinBidAmount: (minBidAmount: number) => void
  // i think this can be removed, this value is being used around the app
  // will look into removing it and using auctionInitialized instead
  auctioningHasStarted: boolean
  setAuctioningHasStarted: (hasStarted: boolean) => void
}

export const useAuctionStore = create<AuctionStoreProps>((set, get) => ({
  auctionContractOwner: '',
  setAuctionContractOwner: (owner: string) => set({ auctionContractOwner: owner }),

  auctionContract: null,
  setAuctionContract: (auctionContract: Auction | null) => set({ auctionContract }),

  minBidAmount: 0.0,
  setMinBidAmount: (minBidAmount: number) => set({ minBidAmount }),

  auctioningHasStarted: false,
  setAuctioningHasStarted: (auctioningHasStarted: boolean) =>
    set({ auctioningHasStarted }),
}))

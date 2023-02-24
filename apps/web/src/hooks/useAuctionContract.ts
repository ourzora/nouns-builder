import { useCallback } from 'react'
import { BigNumber } from 'ethers'
import { Address, useContract, useContractReads, useSigner } from 'wagmi'
import { GetContractResult, ReadContractResult } from '@wagmi/core'
import { auctionAbi } from 'src/data/contract/abis'
import { useDaoStore } from 'src/stores'
import { unpackOptionalArray } from 'src/utils/helpers'

type AuctionContract = GetContractResult<typeof auctionAbi>
type Auction = ReadContractResult<typeof auctionAbi, 'auction'>

interface AuctionContractInterface {
  isLoading: boolean
  contract?: AuctionContract
  owner?: Address
  auction?: Auction
  auctionDuration?: BigNumber
  auctionReservePrice?: BigNumber
  minBidIncrement?: BigNumber
  timeBuffer?: BigNumber
  setDuration: (duration: BigNumber) => void
  setTimeBuffer: (buffer: BigNumber) => void
  setMinBidIncrementPercentage: (minBidIncrementPercentage: BigNumber) => void
  setReservePrice: (reservePrice: BigNumber) => void
}

export const useAuctionContract = (): AuctionContractInterface => {
  const { data: signer } = useSigner()
  const { addresses } = useDaoStore()

  const auctionContract = {
    abi: auctionAbi,
    address: addresses.auction,
  }

  const { data, isLoading } = useContractReads({
    contracts: [
      { ...auctionContract, functionName: 'owner' },
      { ...auctionContract, functionName: 'auction' },
      { ...auctionContract, functionName: 'duration' },
      { ...auctionContract, functionName: 'reservePrice' },
      { ...auctionContract, functionName: 'minBidIncrement' },
      { ...auctionContract, functionName: 'timeBuffer' },
    ],
  })

  const [
    owner,
    auction,
    auctionDuration,
    auctionReservePrice,
    minBidIncrement,
    timeBuffer,
  ] = unpackOptionalArray(data, 6)

  const contract = useContract({ ...auctionContract, signerOrProvider: signer })

  const setDuration = useCallback(
    async (duration: BigNumber) => contract?.setDuration(duration),
    [contract]
  )

  const setTimeBuffer = useCallback(
    async (buffer: BigNumber) => contract?.setTimeBuffer(buffer),
    [contract]
  )

  const setMinBidIncrementPercentage = useCallback(
    async (minBidIncrementPercentage: BigNumber) =>
      contract?.setMinimumBidIncrement(minBidIncrementPercentage),
    [contract]
  )

  const setReservePrice = useCallback(
    async (reservePrice: BigNumber) => contract?.setReservePrice(reservePrice),
    [contract]
  )

  return {
    isLoading,
    contract: contract || undefined,
    owner,
    auction,
    auctionDuration,
    auctionReservePrice,
    minBidIncrement,
    timeBuffer,
    setDuration,
    setTimeBuffer,
    setMinBidIncrementPercentage,
    setReservePrice,
  }
}

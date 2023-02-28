import { GetContractResult, ReadContractResult } from '@wagmi/core'
import { BigNumber, ContractTransaction } from 'ethers'
import { useCallback } from 'react'
import { Address, useContract, useContractReads, useSigner } from 'wagmi'

import { auctionAbi } from 'src/data/contract/abis'
import { unpackOptionalArray } from 'src/utils/helpers'
import { useDaoStore } from 'src/modules/dao' 

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
  setDuration: (duration: BigNumber) => Promise<ContractTransaction | undefined>
  setTimeBuffer: (buffer: BigNumber) => Promise<ContractTransaction | undefined>
  setMinBidIncrementPercentage: (
    minBidIncrementPercentage: BigNumber
  ) => Promise<ContractTransaction | undefined>
  setReservePrice: (reservePrice: BigNumber) => Promise<ContractTransaction | undefined>
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

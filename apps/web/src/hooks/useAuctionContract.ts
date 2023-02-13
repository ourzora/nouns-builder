import { BigNumber } from 'ethers'
import React from 'react'
import { Auction, Auction__factory } from 'src/constants/typechain'
import { useDaoStore } from 'src/stores'
import { getProvider } from 'src/utils/provider'
import { useSigner } from 'wagmi'

//TODO: can this be directly referenced from constants
interface AuctionProps {
  // tokenId: BigNumber
  highestBid: BigNumber
  highestBidder: string
  startTime: number
  endTime: number
  settled: boolean
}

interface auctionResponseProps {
  contract: Auction | undefined
  owner: Promise<string | undefined> | string | undefined
  auction: AuctionProps | undefined
  auctionDuration: BigNumber | undefined
  auctionReservePrice: BigNumber | undefined
  minBidIncrement: BigNumber | undefined
  timeBuffer: BigNumber | undefined
  setDuration: (duration: BigNumber) => void
  setTimeBuffer: (buffer: BigNumber) => void
  setMinBidIncrementPercentage: (minBidIncrementPercentage: BigNumber) => void
  setReservePrice: (reservePrice: BigNumber) => void
}

const useAuctionContract = () => {
  const { data: signer } = useSigner()
  const { addresses } = useDaoStore()

  const contract = React.useMemo(() => {
    if (!addresses.auction) return
    let contract: Auction
    if (signer) {
      contract = new Auction__factory(signer).attach(addresses?.auction)
      // @ts-ignore
      window.auction = contract
    } else {
      contract = Auction__factory.connect(addresses?.auction, getProvider())
    }

    return contract
  }, [signer, addresses])

  /*  get owner address */
  const [owner, setOwner] = React.useState<string | undefined>()
  React.useMemo(async () => {
    if (!contract) return
    const owner = await contract.owner()

    setOwner(owner)
  }, [contract])

  /* auction */
  const [auction, setAuction] = React.useState<AuctionProps | undefined>()
  React.useMemo(async () => {
    if (!contract) return
    const auction = await contract.auction()
    setAuction(auction)
  }, [contract])

  /* auction duration */
  const [auctionDuration, setAuctionDuration] = React.useState<BigNumber | undefined>()
  React.useMemo(async () => {
    if (!contract) return

    setAuctionDuration(await contract.duration())
  }, [contract])

  /* auction min bid increment percentage */
  const [minBidIncrement, setMinBidIncrement] = React.useState<BigNumber | undefined>()
  React.useMemo(async () => {
    if (!contract) return

    setMinBidIncrement(await contract.minBidIncrement())
  }, [contract])

  /* auction timeBuffer */
  const [timeBuffer, setAuctionTimeBuffer] = React.useState<BigNumber | undefined>()
  React.useMemo(async () => {
    if (!contract) return

    setAuctionTimeBuffer(await contract.timeBuffer())
  }, [contract])

  /* auction reserve Price */
  const [auctionReservePrice, setAuctionReservePrice] = React.useState<
    BigNumber | undefined
  >()
  React.useMemo(async () => {
    if (!contract) return

    setAuctionReservePrice(await contract.reservePrice())
  }, [contract])

  /* set duration */
  const setDuration = React.useCallback(
    async function setDuration(_duration: BigNumber) {
      if (!contract) return

      return contract.setDuration(_duration)
    },
    [contract]
  )

  /* set time buffer */
  const setTimeBuffer = React.useCallback(
    async function setTimeBuffer(_buffer: BigNumber) {
      if (!contract) return

      return contract.setTimeBuffer(_buffer)
    },
    [contract]
  )

  /* set min bid increment */
  const setMinBidIncrementPercentage = React.useCallback(
    async function setMinBidIncrementPercentage(_minBidIncrementPercentage: BigNumber) {
      if (!contract) return

      return contract.setMinimumBidIncrement(_minBidIncrementPercentage)
    },
    [contract]
  )

  /* set min bid increment */
  const setReservePrice = React.useCallback(
    async function setReservePrice(_reservePrice: BigNumber) {
      if (!contract) return

      return contract.setReservePrice(_reservePrice)
    },
    [contract]
  )

  const response: auctionResponseProps = {
    contract,
    owner,
    auction,
    auctionDuration,
    auctionReservePrice,
    minBidIncrement,
    setDuration,
    setTimeBuffer,
    timeBuffer,
    setMinBidIncrementPercentage,
    setReservePrice,
  }

  return { ...response }
}

export default useAuctionContract

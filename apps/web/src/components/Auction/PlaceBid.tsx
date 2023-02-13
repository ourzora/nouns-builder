import { auctionActionButtonVariants, bidForm, bidInput } from './Auction.css'
import { useMinBidIncrement } from 'src/hooks/useMinBidIncrement'
import { Auction__factory } from 'src/constants/typechain'
import { Box, Button, Flex } from '@zoralabs/zord'
import { BigNumber, ethers } from 'ethers'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useSWRConfig } from 'swr'
import { ContractButton } from 'src/components/ContractButton'
import useManagerContract from 'src/hooks/useManagerContract'
import { useAuctionStore } from 'src/stores/useAuctionStore'
import { formatCryptoVal } from 'src/utils/numbers'
import shallow from 'zustand/shallow'
import { useSigner } from 'wagmi'
import { useDaoStore } from 'src/stores'
import SWR_KEYS from 'src/constants/swrKeys'
import { getProvider } from 'src/utils/provider'

interface PlaceBidProps {
  collectionAddress?: string
  highestBid?: string
  currentAuction?: number
}

export const PlaceBid = ({
  collectionAddress,
  highestBid,
  currentAuction,
}: PlaceBidProps) => {
  const { data: signer } = useSigner()
  const { mutate } = useSWRConfig()
  const { contract: managerContract } = useManagerContract()
  const { addresses } = useDaoStore()
  const { auctionContract } = useAuctionStore(
    (state) => ({
      auctionContract: state.auctionContract,
    }),
    shallow
  )

  const [creatingBid, setCreatingBid] = useState(false)
  const [bidAmount, setBidAmount] = React.useState<string | undefined>(undefined)
  const [signerETHBalance, setSignerETHBalance] = React.useState<number>(0)
  const [auctionReservePrice, setAuctionReservePrice] = useState<BigNumber | undefined>()
  const [minBidIncrement, setMinBidIncrement] = useState<BigNumber | undefined>()

  const { minBidAmount } = useMinBidIncrement({
    highestBid: BigNumber.from(highestBid),
    reservePrice: auctionReservePrice,
    minBidIncrement,
  })

  useEffect(() => {
    const getData = async () => {
      if (!addresses?.auction) return

      const contract = Auction__factory.connect(addresses?.auction, getProvider())
      const reserve = await contract.reservePrice()
      const minbid = await contract.minBidIncrement()

      setAuctionReservePrice(reserve)
      setMinBidIncrement(minbid)
    }

    getData()
  }, [addresses])

  useEffect(() => {
    if (!signer || !signer.provider) return

    const getSignerBalance = async () => {
      const balance =
        (await signer?.provider?.getBalance(await signer?.getAddress())) || 0
      setSignerETHBalance(parseFloat(ethers.utils.formatEther(balance)))
    }

    getSignerBalance()
  }, [signer])

  const getAuctionContract = React.useCallback(async () => {
    if (!managerContract || !collectionAddress || !signer) return

    const addresses = await managerContract?.getAddresses(
      ethers.utils.getAddress(collectionAddress as string)
    )
    const auctionAddress = addresses?.auction
    const contract =
      auctionAddress &&
      Auction__factory.connect(
        auctionAddress ? auctionAddress : addresses?.auction || '',
        signer
      )

    return contract
  }, [managerContract, collectionAddress, signer])

  const createBid = React.useCallback(
    async (id: string, bid: { value: BigNumber }) => {
      const _auctionContract = await getAuctionContract()
      const contract = _auctionContract ?? auctionContract

      if (!contract || !signer || creatingBid) return
      try {
        setCreatingBid(true)

        const { wait } = await contract.createBid(id, bid)
        await wait()
        setCreatingBid(false)

        await mutate([SWR_KEYS.AUCTION_BIDS, addresses?.auction, currentAuction])
      } catch (error) {
        setCreatingBid(false)
      }
    },
    [
      auctionContract,
      signer,
      addresses,
      creatingBid,
      currentAuction,
      getAuctionContract,
      mutate,
    ]
  )

  const handleCreateBid = React.useCallback(async () => {
    if (!bidAmount) return

    const bid = ethers.utils.parseEther(bidAmount)
    createBid(String(currentAuction), { value: bid })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bidAmount, createBid])

  const isMinBid = Number(bidAmount) >= minBidAmount
  const formattedMinBid = formatCryptoVal(minBidAmount)

  return (
    <Flex
      width="100%"
      direction={{ '@initial': 'column', '@768': 'row' }}
      justify={'flex-start'}
    >
      {!creatingBid ? (
        <Fragment>
          <form className={bidForm}>
            <Box position="relative" mr={{ '@initial': 'x0', '@768': 'x2' }}>
              <input
                placeholder={`${formattedMinBid} ETH or more`}
                type={'number'}
                className={bidInput}
                min={formattedMinBid}
                max={signerETHBalance}
                onChange={(event) => setBidAmount(event.target.value)}
              />
              <Box position="absolute" style={{ top: 0, right: 0, bottom: 0 }}>
                <Flex align={'center'} height={'100%'} pr={'x4'} fontWeight={'display'}>
                  ETH
                </Flex>
              </Box>
            </Box>
          </form>

          <ContractButton
            className={auctionActionButtonVariants['bid']}
            handleClick={handleCreateBid}
            disabled={!isMinBid}
            mt={{ '@initial': 'x2', '@768': 'x0' }}
          >
            Place bid
          </ContractButton>
        </Fragment>
      ) : (
        <Button className={auctionActionButtonVariants['bidding']} disabled>
          placing {bidAmount} ETH bid
        </Button>
      )}
    </Flex>
  )
}

export const MemoizedPlaceBid = memo(PlaceBid)

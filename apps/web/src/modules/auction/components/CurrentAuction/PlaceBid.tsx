import { prepareWriteContract, writeContract } from '@wagmi/core'
import { Box, Button, Flex } from '@zoralabs/zord'
import { BigNumber, ethers } from 'ethers'
import React, { Fragment, memo, useState } from 'react'
import { useSWRConfig } from 'swr'
import { useAccount, useBalance, useContractReads, useSigner } from 'wagmi'

import { ContractButton } from 'src/components/ContractButton'
import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi } from 'src/data/contract/abis'
import getBids from 'src/data/contract/requests/getBids'
import { useDaoStore } from 'src/modules/dao'
import { AddressType } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'
import { formatCryptoVal } from 'src/utils/numbers'

import { useMinBidIncrement } from '../../hooks'
import { auctionActionButtonVariants, bidForm, bidInput } from '../Auction.css'

interface PlaceBidProps {
  tokenId: string
  highestBid?: BigNumber
}

export const PlaceBid = ({ highestBid, tokenId }: PlaceBidProps) => {
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const { data: balance } = useBalance({ address: address })
  const { mutate } = useSWRConfig()
  const { addresses } = useDaoStore()
  const [creatingBid, setCreatingBid] = useState(false)
  const [bidAmount, setBidAmount] = React.useState<string | undefined>(undefined)

  const auctionContractParams = {
    abi: auctionAbi,
    address: addresses.auction,
  }
  const { data } = useContractReads({
    contracts: [
      { ...auctionContractParams, functionName: 'reservePrice' },
      { ...auctionContractParams, functionName: 'minBidIncrement' },
    ],
  })
  const [auctionReservePrice, minBidIncrement] = unpackOptionalArray(data, 2)
  const { minBidAmount } = useMinBidIncrement({
    highestBid,
    reservePrice: auctionReservePrice,
    minBidIncrement,
  })

  const createBid = React.useCallback(
    async (id: string, bid: { value: BigNumber }) => {
      if (!signer || creatingBid) return
      try {
        setCreatingBid(true)

        const config = await prepareWriteContract({
          abi: auctionAbi,
          address: addresses.auction as AddressType,
          functionName: 'createBid',
          signer: signer,
          args: [BigNumber.from(id)],
          overrides: { value: ethers.utils.parseEther(bid.toString()) },
        })
        const { wait } = await writeContract(config)
        await wait()
        setCreatingBid(false)

        await mutate([SWR_KEYS.AUCTION_BIDS, addresses.auction, tokenId], () =>
          getBids(addresses.auction as string, tokenId)
        )
      } catch (error) {
        setCreatingBid(false)
      }
    },
    [signer, addresses, creatingBid, tokenId, mutate]
  )

  const handleCreateBid = React.useCallback(async () => {
    if (!bidAmount) return

    const bid = ethers.utils.parseEther(bidAmount)
    createBid(tokenId, { value: bid })

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
                max={balance?.formatted}
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

import { Box, Button, Flex } from '@zoralabs/zord'
import { BigNumber, ethers } from 'ethers'
import React, { Fragment, memo, useState } from 'react'
import { useSWRConfig } from 'swr'
import { useAccount, useBalance, useSigner } from 'wagmi'

import { ContractButton } from 'src/components/ContractButton'
import SWR_KEYS from 'src/constants/swrKeys'
import getBids from 'src/data/contract/requests/getBids'
import { useAuctionContract } from 'src/hooks'
import { useDaoStore } from 'src/stores'
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
  const { data: balance, isError } = useBalance({ address: address })
  const { mutate } = useSWRConfig()
  const {
    contract: auctionContract,
    auctionReservePrice,
    minBidIncrement,
  } = useAuctionContract()
  const { addresses } = useDaoStore()

  const [creatingBid, setCreatingBid] = useState(false)
  const [bidAmount, setBidAmount] = React.useState<string | undefined>(undefined)

  const { minBidAmount } = useMinBidIncrement({
    highestBid,
    reservePrice: auctionReservePrice,
    minBidIncrement,
  })

  const createBid = React.useCallback(
    async (id: string, bid: { value: BigNumber }) => {
      if (!auctionContract || !signer || creatingBid) return
      try {
        setCreatingBid(true)

        const { wait } = await auctionContract.createBid(BigNumber.from(id), bid)
        await wait()
        setCreatingBid(false)

        await mutate([SWR_KEYS.AUCTION_BIDS, addresses.auction, tokenId], () =>
          getBids(addresses.auction as string, tokenId)
        )
      } catch (error) {
        setCreatingBid(false)
      }
    },
    [auctionContract, signer, addresses, creatingBid, tokenId, mutate]
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

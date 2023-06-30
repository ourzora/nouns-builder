import { prepareWriteContract, writeContract } from '@wagmi/core'
import { Box, Button, Flex } from '@zoralabs/zord'
import { BigNumber, ethers } from 'ethers'
import React, { Fragment, memo, useState } from 'react'
import { useSWRConfig } from 'swr'
import {
  Address,
  useAccount,
  useBalance,
  useContractReads,
  useNetwork,
  useSigner,
} from 'wagmi'

import { ContractButton } from 'src/components/ContractButton'
import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi } from 'src/data/contract/abis'
import getBids from 'src/data/contract/requests/getBids'
import { useDaoStore } from 'src/modules/dao'
import { Chain } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'
import { formatCryptoVal } from 'src/utils/numbers'

import { useMinBidIncrement } from '../../hooks'
import { auctionActionButtonVariants, bidForm, bidInput } from '../Auction.css'

interface PlaceBidProps {
  chain: Chain
  tokenId: string
  highestBid?: BigNumber
}

export const PlaceBid = ({ chain, highestBid, tokenId }: PlaceBidProps) => {
  const { data: signer } = useSigner()
  const { address } = useAccount()
  const { chain: wagmiChain } = useNetwork()
  const { data: balance } = useBalance({ address: address, chainId: chain.id })
  const { mutate } = useSWRConfig()
  const { addresses } = useDaoStore()

  const [creatingBid, setCreatingBid] = useState(false)
  const [bidAmount, setBidAmount] = React.useState<string | undefined>(undefined)

  const auctionContractParams = {
    abi: auctionAbi,
    address: addresses.auction,
    chainId: chain.id,
  }
  const { data } = useContractReads({
    contracts: [
      { ...auctionContractParams, functionName: 'reservePrice' },
      { ...auctionContractParams, functionName: 'minBidIncrement' },
    ] as const,
  })
  const [auctionReservePrice, minBidIncrement] = unpackOptionalArray(data, 2)

  const { minBidAmount } = useMinBidIncrement({
    highestBid,
    reservePrice: auctionReservePrice,
    minBidIncrement,
  })

  const handleCreateBid = async () => {
    if (!isMinBid || !bidAmount || !signer || creatingBid) return

    try {
      setCreatingBid(true)

      const config = await prepareWriteContract({
        abi: auctionAbi,
        address: addresses.auction as Address,
        functionName: 'createBid',
        signer: signer,
        args: [BigNumber.from(tokenId)],
        overrides: { value: ethers.utils.parseEther(bidAmount) },
      })
      const { wait } = await writeContract(config)
      await wait()

      await mutate([SWR_KEYS.AUCTION_BIDS, chain, addresses.auction, tokenId], () =>
        getBids(chain, addresses.auction as string, tokenId)
      )
    } catch (error) {
      console.error(error)
    } finally {
      setCreatingBid(false)
    }
  }

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
            disabled={
              address && wagmiChain?.id == chain.id ? !isMinBid || !bidAmount : false
            }
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

import { Box, Button, Flex } from '@zoralabs/zord'
import React, { useState } from 'react'
import { Address, parseEther } from 'viem'
import { useBalance, useNetwork } from 'wagmi'
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions'

import { ContractButton } from 'src/components/ContractButton'
import { auctionAbi } from 'src/data/contract/abis'
import { AddressType } from 'src/typings'
import { maxChar } from 'src/utils/helpers'

import { useMinBidIncrement } from '../auction'
import { Settle } from '../auction/components/CurrentAuction/Settle'
import { DashboardDao } from './Dashboard'
import { bidInput } from './dashboard.css'

export const BidActionButton = ({
  userAddress,
  chainId,
  auctionConfig,
  currentAuction,
  isEnded,
  auctionAddress,
  isOver,
}: DashboardDao & { userAddress: AddressType; isOver: boolean; isEnded: boolean }) => {
  const { data: balance } = useBalance({ address: userAddress, chainId })
  const { minimumBidIncrement, reservePrice } = auctionConfig
  const { highestBid } = currentAuction
  const { chain: wagmiChain } = useNetwork()
  const { minBidAmount } = useMinBidIncrement({
    highestBid: highestBid?.amount ? BigInt(highestBid?.amount) : undefined,
    reservePrice: BigInt(reservePrice),
    minBidIncrement: BigInt(minimumBidIncrement),
  })

  const [bidAmount, setBidAmount] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isMinBid = Number(bidAmount) >= minBidAmount

  const isValidBid = bidAmount && isMinBid

  const isValidChain = wagmiChain?.id === chainId

  const handleCreateBid = async () => {
    if (!isMinBid || !bidAmount || isLoading) return

    try {
      setIsLoading(true)

      const config = await prepareWriteContract({
        abi: auctionAbi,
        address: auctionAddress as Address,
        functionName: 'createBid',
        args: [BigInt(currentAuction.token.tokenId)],
        value: parseEther(bidAmount.toString()),
      })
      const tx = await writeContract(config)
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })
      setBidAmount('')
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isEnded || isOver) {
    return (
      <Box ml={'auto'}>
        <Settle
          isEnding={false}
          owner={highestBid?.bidder}
          externalAuctionAddress={auctionAddress}
        />
      </Box>
    )
  }

  return (
    <>
      <form style={{ marginLeft: 'auto' }}>
        <Box position="relative" mr={{ '@initial': 'x0', '@768': 'x2' }}>
          <input
            className={bidInput}
            placeholder={maxChar(`${minBidAmount} ETH`, 12)}
            type={'number'}
            min={minBidAmount}
            max={balance?.formatted}
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
          />
          <Flex
            position="absolute"
            style={{ top: 0, right: 0, bottom: 0 }}
            align={'center'}
            justify={'center'}
          >
            <Button
              height={'100%'}
              mr={'x4'}
              px={'x0'}
              fontWeight={'label'}
              size="sm"
              variant="ghost"
              style={{
                minWidth: 'fit-content',
                fontWeight: 500,
                paddingLeft: 0,
                paddingRight: 0,
              }}
              onClick={() => setBidAmount(minBidAmount.toString())}
              disabled={Number(bidAmount) >= minBidAmount}
            >
              Min
            </Button>
          </Flex>
        </Box>
      </form>
      <ContractButton
        borderRadius={'curved'}
        disabled={!isValidBid || !isValidChain}
        loading={isLoading}
        handleClick={() => handleCreateBid()}
      >
        Bid
      </ContractButton>
    </>
  )
}

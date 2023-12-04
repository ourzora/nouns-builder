import { Box, Button, Flex } from '@zoralabs/zord'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useSWRConfig } from 'swr'
import useSWRImmutable from 'swr/immutable'
import { formatEther, parseEther } from 'viem'
import { Address, useAccount, useBalance, useContractReads, useNetwork } from 'wagmi'
import { prepareWriteContract, waitForTransaction, writeContract } from 'wagmi/actions'

import { ContractButton } from 'src/components/ContractButton'
import AnimatedModal from 'src/components/Modal/AnimatedModal'
import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi } from 'src/data/contract/abis'
import { SDK } from 'src/data/subgraph/client'
import { getBids } from 'src/data/subgraph/requests/getBids'
import { useDaoStore } from 'src/modules/dao'
import { AddressType, Chain } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'
import { formatCryptoVal } from 'src/utils/numbers'

import { useMinBidIncrement } from '../../hooks'
import { auctionActionButtonVariants, bidForm, bidInput } from '../Auction.css'
import { WarningModal } from './WarningModal'

interface PlaceBidProps {
  chain: Chain
  tokenId: string
  daoName: string
  highestBid?: bigint
}

export const PlaceBid = ({ chain, highestBid, tokenId, daoName }: PlaceBidProps) => {
  const { address } = useAccount()
  const { chain: wagmiChain } = useNetwork()
  const { data: balance } = useBalance({ address: address, chainId: chain.id })
  const { mutate } = useSWRConfig()
  const { addresses } = useDaoStore()

  const [creatingBid, setCreatingBid] = useState(false)
  const [showWarning, setShowWarning] = useState(false)
  const [bidAmount, setBidAmount] = React.useState<string | undefined>(undefined)

  const auctionContractParams = {
    abi: auctionAbi,
    address: addresses.auction as AddressType,
    chainId: chain.id,
  }
  const { data } = useContractReads({
    allowFailure: false,
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

  const { data: averageWinningBid } = useSWRImmutable(
    addresses.token ? [SWR_KEYS.AUCTION, chain.id, addresses.token] : undefined,
    async (_, chainId, tokenAddress) => {
      const history = await SDK.connect(chainId).auctionHistory({
        daoId: tokenAddress.toLowerCase(),
        startTime: 0,
        first: 5,
      })

      const nonZeroAuctions = history.dao?.auctions.filter(
        (x) => x.winningBid?.amount && BigInt(x.winningBid?.amount) > 0n
      )

      if (!nonZeroAuctions?.length) return BigInt(0)

      const auctionSum =
        nonZeroAuctions
          .map((x) => BigInt(x.winningBid?.amount || 0))
          .reduce((acc, bid) => {
            return acc + bid
          }) || 0n

      return auctionSum / BigInt(nonZeroAuctions.length)
    }
  )

  const isMinBid = Number(bidAmount) >= minBidAmount
  const formattedMinBid = formatCryptoVal(minBidAmount)

  // Warn users if they are bidding more than 5x the average winning bid or reserve price
  const minAmountForWarning = (averageWinningBid || auctionReservePrice || 0n) * 5n

  const handleCreateBid = async () => {
    if (!isMinBid || !bidAmount || creatingBid) return

    const amountInWei = parseEther(bidAmount)

    if (amountInWei && minAmountForWarning && amountInWei > minAmountForWarning) {
      setShowWarning(true)
      return
    }

    await createBidTransaction()
  }

  const createBidTransaction = async () => {
    if (!isMinBid || !bidAmount) return

    try {
      setCreatingBid(true)

      const config = await prepareWriteContract({
        abi: auctionAbi,
        address: addresses.auction as Address,
        functionName: 'createBid',
        args: [BigInt(tokenId)],
        value: parseEther(bidAmount),
      })
      const tx = await writeContract(config)
      if (tx?.hash) await waitForTransaction({ hash: tx.hash })

      await mutate([SWR_KEYS.AUCTION_BIDS, chain.id, addresses.token, tokenId], () =>
        getBids(chain.id, addresses.token!, tokenId)
      )
    } catch (error) {
      console.error(error)
    } finally {
      setCreatingBid(false)
    }
  }

  useEffect(() => {
    document.body.style.overflow = !!showWarning ? 'hidden' : 'unset'
  }, [showWarning])

  const isValidBid = bidAmount && isMinBid
  const isValidChain = wagmiChain?.id === chain.id

  return (
    <Flex
      width="100%"
      direction={{ '@initial': 'column', '@768': 'row' }}
      justify={'flex-start'}
    >
      {bidAmount && averageWinningBid ? (
        <AnimatedModal size={'small'} open={showWarning}>
          <WarningModal
            daoName={daoName}
            currentBid={bidAmount}
            isCreatingBid={creatingBid}
            averagePrice={formatEther(averageWinningBid)}
            onCancel={() => setShowWarning(false)}
            onConfirm={() => createBidTransaction()}
          />
        </AnimatedModal>
      ) : null}

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
            disabled={address && isValidChain ? !isValidBid : false}
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

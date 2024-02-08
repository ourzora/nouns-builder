import { Flex, Grid } from '@zoralabs/zord'
import React, { Fragment, ReactNode } from 'react'
import useSWR from 'swr'
import { formatEther } from 'viem'
import { readContract } from 'wagmi/actions'

import SWR_KEYS from 'src/constants/swrKeys'
import { auctionAbi } from 'src/data/contract/abis'
import { getBids } from 'src/data/subgraph/requests/getBids'
import { TokenWithDao } from 'src/pages/dao/[network]/[token]/[tokenId]'
import { AddressType, Chain } from 'src/typings'
import { unpackOptionalArray } from 'src/utils/helpers'

import { useAuctionEvents } from '../hooks'
import { auctionGrid, auctionWrapper } from './Auction.css'
import { AuctionDetails } from './AuctionDetails'
import { AuctionImage } from './AuctionImage'
import { AuctionPaused } from './AuctionPaused'
import { AuctionTokenPicker } from './AuctionTokenPicker'
import { BidAmount } from './BidAmount'
import { ActionsWrapper, BidHistory } from './BidHistory'
import { CurrentAuction } from './CurrentAuction'
import { WinningBidder } from './WinningBidder'

interface AuctionControllerProps {
  chain: Chain
  auctionAddress: string
  collection: string
  token: TokenWithDao
  viewSwitcher?: ReactNode
}

export const Auction: React.FC<AuctionControllerProps> = ({
  chain,
  auctionAddress,
  collection,
  token,
}) => {
  const { mintedAt, name, image, owner: tokenOwner, tokenId: queriedTokenId } = token
  const mintDate = mintedAt * 1000
  const bidAmount = token.auction?.winningBid?.amount
  const tokenPrice = bidAmount ? formatEther(bidAmount) : undefined

  const { data: auction } = useSWR(
    [SWR_KEYS.AUCTION, chain.id, auctionAddress],
    (_, chainId, auctionAddress) =>
      readContract({
        abi: auctionAbi,
        address: auctionAddress as AddressType,
        functionName: 'auction',
        chainId,
      }),
    { revalidateOnFocus: true }
  )

  const [currentTokenId, highestBid, highestBidder, _, endTime, settled] =
    unpackOptionalArray(auction, 6)

  const isTokenActiveAuction =
    !settled &&
    currentTokenId !== undefined &&
    currentTokenId.toString() == queriedTokenId

  useAuctionEvents({
    chainId: chain.id,
    collection,
    isTokenActiveAuction,
    tokenId: queriedTokenId,
  })

  const { data: bids } = useSWR(
    [SWR_KEYS.AUCTION_BIDS, chain.id, collection, queriedTokenId],
    () => getBids(chain.id, collection, queriedTokenId)
  )

  return (
    <Grid className={auctionGrid}>
      <AuctionImage
        key={`auction-${collection}-image-${queriedTokenId}`}
        image={image}
        isLoading={!auction}
      />
      <Flex
        direction={'column'}
        height={{ '@initial': 'auto', '@768': '100%' }}
        mt={{ '@initial': 'x4', '@768': 'x0' }}
        className={auctionWrapper}
      >
        <AuctionTokenPicker
          mintDate={mintDate}
          name={name}
          collection={collection}
          tokenId={Number(queriedTokenId)}
          currentAuction={Number(currentTokenId)}
        />

        {isTokenActiveAuction && !!auction && (
          <CurrentAuction
            chain={chain}
            tokenId={queriedTokenId}
            auctionAddress={auctionAddress}
            daoName={token.dao.name}
            bid={highestBid}
            owner={highestBidder}
            endTime={endTime}
            bids={bids || []}
          />
        )}

        {!isTokenActiveAuction && !!auction && (
          <Fragment>
            <AuctionDetails>
              <BidAmount isOver bid={tokenPrice ?? undefined} />
              <WinningBidder owner={tokenOwner ?? undefined} />
            </AuctionDetails>
            <ActionsWrapper>
              <BidHistory bids={bids || []} />
            </ActionsWrapper>
            <AuctionPaused />
          </Fragment>
        )}
      </Flex>
    </Grid>
  )
}

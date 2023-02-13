import { auctionGrid, auctionWrapper, auctionWrapVariants } from './Auction.css'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { Flex, Grid } from '@zoralabs/zord'
import { ActionsWrapper, BidHistory } from './BidHistory'
import { AuctionDetails, BidAmount, WinningBidder } from './AuctionDetails'
import AuctionImage from './AuctionImage'
import AuctionTokenPicker from './AuctionTokenPicker'
import { useAuctionTokenData } from 'src/hooks/useAuctionTokenData'
import useAuction from 'src/hooks/useAuction'
import { CurrentAuction } from './CurrentAuction'

interface AuctionControllerProps {
  auctionAddress: string
}

const AuctionController: React.FC<AuctionControllerProps> = ({ auctionAddress }) => {
  const { query } = useRouter()

  const {
    mintDate,
    name,
    image,
    currentAuction,
    isTokenActiveAuction,
    tokenPrice,
    tokenOwner,
    isLoading,
    highestBid,
    highestBidder,
    endTime,
  } = useAuctionTokenData({
    collection: (query?.token as string) || '',
    tokenId: (query?.tokenId as string) || '',
  })

  useAuction({
    auctionAddress,
    collection: query?.token as string,
    isTokenActiveAuction,
    tokenId: query?.tokenId as string,
  })

  return (
    <Flex className={auctionWrapVariants['post']}>
      <Grid className={auctionGrid}>
        <AuctionImage
          key={`auction-${query?.token}-image-${query?.tokenId}`}
          image={image}
          isLoading={isLoading}
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
            currentAuction={currentAuction}
          />

          {isTokenActiveAuction && !isLoading && (
            <CurrentAuction
              auctionAddress={auctionAddress}
              bid={highestBid ?? undefined}
              owner={highestBidder ?? undefined}
              endTime={endTime}
              currentAuction={currentAuction}
            />
          )}

          {!isTokenActiveAuction && !isLoading && (
            <Fragment>
              <AuctionDetails>
                <BidAmount isOver bid={tokenPrice ?? undefined} />
                <WinningBidder owner={tokenOwner ?? undefined} />
              </AuctionDetails>
              <ActionsWrapper>
                <BidHistory auctionAddress={auctionAddress} />
              </ActionsWrapper>
            </Fragment>
          )}
        </Flex>
      </Grid>
    </Flex>
  )
}

export default AuctionController

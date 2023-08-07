import { Button, Flex } from '@zoralabs/zord'
import React from 'react'

import { TokenWithWinner } from 'src/data/contract/requests/getToken'
import { Auction } from 'src/modules/auction'
import { AuctionSkeleton } from 'src/modules/auction/components/AuctionSkeleton'
import { AuctionChart } from 'src/modules/dao/components/AuctionChart/AuctionChart'
import { Chain } from 'src/typings'

type TopSectionProps = {
  chain: Chain
  collection: string
  auctionAddress?: string
  token?: TokenWithWinner
}

export enum TopSectionView {
  Auction = 'auction',
  Chart = 'chart',
}

export const TopSection = ({
  chain,
  auctionAddress,
  collection,
  token,
}: TopSectionProps) => {
  const [topSectionView, setTopSectionView] = React.useState<TopSectionView>(
    TopSectionView.Auction
  )
  if (topSectionView === TopSectionView.Auction) {
    return token && auctionAddress ? (
      <Auction
        chain={chain}
        auctionAddress={auctionAddress}
        collection={collection}
        token={token}
        viewSwitcher={
          <ViewSwitcher
            topSectionView={topSectionView}
            setTopSectionView={setTopSectionView}
          />
        }
      />
    ) : (
      <AuctionSkeleton />
    )
  }
  if (topSectionView === TopSectionView.Chart) {
    return (
      <AuctionChart
        viewSwitcher={
          <ViewSwitcher
            topSectionView={topSectionView}
            setTopSectionView={setTopSectionView}
          />
        }
      />
    )
  }

  return null
}

const ViewSwitcher = ({
  topSectionView,
  setTopSectionView,
}: {
  topSectionView: TopSectionView
  setTopSectionView: (view: TopSectionView) => void
}) => {
  return (
    <Flex w={'100%'} justify={'center'} mb={'x3'}>
      <Flex style={{ width: '100%', maxWidth: '912px' }}>
        {Object.values(TopSectionView).map((view) => (
          <Button
            size="xs"
            style={{ textTransform: 'capitalize' }}
            onClick={() => setTopSectionView(view)}
            variant={view === topSectionView ? 'primary' : 'outline'}
            key={view}
          >
            {view}
          </Button>
        ))}
      </Flex>
    </Flex>
  )
}

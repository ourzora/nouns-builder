import { Button, Flex } from '@zoralabs/zord'
import React from 'react'

import { TokenWithWinner } from 'src/data/contract/requests/getToken'
import { Auction } from 'src/modules/auction'
import { AuctionSkeleton } from 'src/modules/auction/components/AuctionSkeleton'
import { AuctionChart } from 'src/modules/dao/components/AuctionChart/AuctionChart'
import {
  activeFilter,
  inactiveFilter,
} from 'src/modules/dao/components/AuctionChart/AuctionChart.css'
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
            size="md"
            px={'x0'}
            mr={'x3'}
            w={'x16'}
            style={{ textTransform: 'capitalize' }}
            onClick={() => setTopSectionView(view)}
            variant={'ghost'}
            key={view}
            className={view === topSectionView ? activeFilter : inactiveFilter}
          >
            {view}
          </Button>
        ))}
      </Flex>
    </Flex>
  )
}

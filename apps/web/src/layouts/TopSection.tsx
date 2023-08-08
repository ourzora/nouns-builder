import React from 'react'

import { TokenWithWinner } from 'src/data/contract/requests/getToken'
import { Auction } from 'src/modules/auction'
import { AuctionSkeleton } from 'src/modules/auction/components/AuctionSkeleton'
import { ViewSwitcher } from 'src/modules/auction/components/ViewSwitcher'
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

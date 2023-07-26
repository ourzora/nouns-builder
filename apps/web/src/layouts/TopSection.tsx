import React from 'react'

import { TokenWithWinner } from 'src/data/contract/requests/getToken'
import { Auction } from 'src/modules/auction'
import { AuctionSkeleton } from 'src/modules/auction/components/AuctionSkeleton'
import { Chain } from 'src/typings'

type TopSectionProps = {
  chain: Chain
  collection: string
  auctionAddress?: string
  token?: TokenWithWinner
}

enum TopSectionView {
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
      />
    ) : (
      <AuctionSkeleton />
    )
  }
  if (topSectionView === TopSectionView.Chart) {
    return <Chart />
  }

  return <>'error'</>
}

const Chart = () => {
  return (
    <div>
      <h1>Chart</h1>
    </div>
  )
}

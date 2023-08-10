import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactElement } from 'react'

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
      <ViewSwitcher topSectionView={topSectionView} setTopSectionView={setTopSectionView}>
        <TabSwitchAnimation topSectionView={topSectionView}>
          <AuctionChart />
        </TabSwitchAnimation>
      </ViewSwitcher>
    )
  }

  return token && auctionAddress ? (
    <ViewSwitcher topSectionView={topSectionView} setTopSectionView={setTopSectionView}>
      <TabSwitchAnimation topSectionView={topSectionView}>
        <Auction
          chain={chain}
          auctionAddress={auctionAddress}
          collection={collection}
          token={token}
        />
      </TabSwitchAnimation>
    </ViewSwitcher>
  ) : (
    <AuctionSkeleton />
  )
}

const TabSwitchAnimation = ({
  children,
  topSectionView,
}: {
  children: ReactElement
  topSectionView: string
}) => {
  return (
    <AnimatePresence exitBeforeEnter={true}>
      <motion.div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        key={topSectionView}
        variants={{
          closed: {
            opacity: 0,
          },
          open: {
            opacity: 1,
          },
        }}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

import { Button, Flex } from '@zoralabs/zord'
import React from 'react'

import { TopSectionView } from 'src/layouts/TopSection'
import {
  selectedTab,
  unselectedTab,
} from 'src/modules/dao/components/AuctionChart/AuctionChart.css'

import { switcherBox } from './Auction.css'

export const ViewSwitcher = ({
  topSectionView,
  setTopSectionView,
}: {
  topSectionView: TopSectionView
  setTopSectionView: (view: TopSectionView) => void
}) => (
  <Flex w={'100%'} justify={'center'} mb={'x3'}>
    <Flex className={switcherBox}>
      {Object.values(TopSectionView).map((view) => (
        <Button
          size="md"
          px={'x0'}
          mr={'x3'}
          w={'x16'}
          onClick={() => setTopSectionView(view)}
          variant={'ghost'}
          key={view}
          className={view === topSectionView ? selectedTab : unselectedTab}
        >
          {view}
        </Button>
      ))}
    </Flex>
  </Flex>
)

import { Button, Flex, Text } from '@zoralabs/zord'
import React, { ReactNode } from 'react'

import {
  newTag,
  selectedTab,
  unselectedTab,
} from 'src/modules/dao/components/AuctionChart/AuctionChart.css'
import { TopSectionView } from 'src/modules/dao/components/DaoTopSection'

import { auctionWrapVariants, switcherBox } from './Auction.css'

export const ViewSwitcher = ({
  topSectionView,
  setTopSectionView,
  children,
}: {
  topSectionView: TopSectionView
  setTopSectionView: (view: TopSectionView) => void
  children: ReactNode
}) => (
  <Flex className={auctionWrapVariants['post']}>
    <Flex w={'100%'} justify={'center'} mb={'x3'}>
      <Flex className={switcherBox}>
        {Object.values(TopSectionView).map((view) => (
          <Button
            size="md"
            pos={'relative'}
            px={'x0'}
            mr={'x3'}
            w={'x16'}
            onClick={() => setTopSectionView(view)}
            variant={'ghost'}
            key={view}
            className={view === topSectionView ? selectedTab : unselectedTab}
          >
            {view}
            {view === 'chart' && (
              <Text
                backgroundColor="positive"
                className={newTag}
                borderRadius={'phat'}
                fontSize={12}
              >
                New
              </Text>
            )}
          </Button>
        ))}
      </Flex>
    </Flex>
    <Flex justify={'center'}>{children}</Flex>
  </Flex>
)

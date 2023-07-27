import { Button, Flex } from '@zoralabs/zord'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'
import useSWR from 'swr'

import { TokenWithWinner } from 'src/data/contract/requests/getToken'
import { AuctionHistory } from 'src/data/subgraph/requests/auctionHistory'
import { Auction } from 'src/modules/auction'
import { auctionWrapVariants } from 'src/modules/auction/components/Auction.css'
import { AuctionSkeleton } from 'src/modules/auction/components/AuctionSkeleton'
import { useDaoStore } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'
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
      <Chart
        viewSwitcher={
          <ViewSwitcher
            topSectionView={topSectionView}
            setTopSectionView={setTopSectionView}
          />
        }
      />
    )
  }

  return <>'error'</>
}

enum StartTimes {
  '30 days' = '30',
  '60 days' = '60',
  '90 days' = '90',
  'All' = '0',
}

const startTimeFromNow = (startTime: StartTimes) => {
  if (startTime === '0') return 0

  const nowInSeconds = Math.floor(Date.now() / 1000)

  return nowInSeconds - parseInt(startTime) * 24 * 60 * 60
}

const Chart = ({ viewSwitcher }: { viewSwitcher: ReactNode }) => {
  const { query, isReady } = useRouter()
  const chain = useChainStore((x) => x.chain)
  const {
    addresses: { token },
  } = useDaoStore()

  const [startTime, setStartTime] = useState(startTimeFromNow(StartTimes['All']))

  const { data, error, isValidating } = useSWR(
    isReady ? [token, chain.id, startTime] : undefined,
    () =>
      axios
        .get<{ auctionHistory: AuctionHistory }>(
          `/api/auctionHistory/${token}?chainId=${chain.id}&startTime=${startTime}`
        )
        .then((x) => x.data.auctionHistory)
  )
  console.log('data', data)
  return (
    <Flex className={auctionWrapVariants['post']}>
      {viewSwitcher}
      <Flex></Flex>
    </Flex>
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

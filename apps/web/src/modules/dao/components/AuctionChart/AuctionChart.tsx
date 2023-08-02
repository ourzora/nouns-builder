import { Flex } from '@zoralabs/zord'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { ReactNode, useState } from 'react'
import useSWR from 'swr'

import { AuctionHistory } from 'src/data/subgraph/requests/auctionHistory'
import { auctionWrapVariants } from 'src/modules/auction/components/Auction.css'
import { useDaoStore } from 'src/modules/dao'
import { useChainStore } from 'src/stores/useChainStore'

import { AuctionGraph } from './AuctionGraph'

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

export const AuctionChart = ({ viewSwitcher }: { viewSwitcher: ReactNode }) => {
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
        .get<{ auctionHistory: AuctionHistory[] }>(
          `/api/auctionHistory/${token}?chainId=${chain.id}&startTime=${startTime}`
        )
        .then((x) => x.data.auctionHistory)
  )

  return (
    <Flex className={auctionWrapVariants['post']}>
      {viewSwitcher}

      <Flex
        direction="column"
        // align="center"
        style={{
          // maxWidth: '962px',
          width: '100%',
        }}
      >
        {data && <AuctionGraph chartData={data} />}
      </Flex>
    </Flex>
  )
}

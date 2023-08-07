import { Box, Button, Flex, Text } from '@zoralabs/zord'
import axios from 'axios'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRouter } from 'next/router'
import React, { ReactNode, useMemo, useState } from 'react'
import useSWR from 'swr'

import { AuctionHistory } from 'src/data/subgraph/requests/auctionHistory'
import { auctionWrapVariants } from 'src/modules/auction/components/Auction.css'
import { useDaoStore } from 'src/modules/dao'
import { useLayoutStore } from 'src/stores'
import { useChainStore } from 'src/stores/useChainStore'

import { activeFilter, inactiveFilter } from './AuctionChart.css'
import { AuctionGraph } from './AuctionGraph'

export enum StartTimes {
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
  const { isReady } = useRouter()
  const chain = useChainStore((x) => x.chain)
  const {
    addresses: { token },
  } = useDaoStore()

  const [startTime, setStartTime] = useState(StartTimes['All'])

  const startSeconds = startTimeFromNow(startTime)

  const { data, error, isValidating } = useSWR(
    isReady ? [token, chain.id, startSeconds] : undefined,
    () =>
      axios
        .get<{ auctionHistory: AuctionHistory[] }>(
          `/api/auctionHistory/${token}?chainId=${chain.id}&startTime=${startSeconds}`
        )
        .then((x) => x.data.auctionHistory)
  )

  if (isValidating) {
    return (
      <AuctionGraphLayout
        viewSwitcher={viewSwitcher}
        startTime={startTime}
        setStartTime={setStartTime}
        chart={null}
      />
    )
  }

  if (error) {
    return null
  }

  if (!data || !data.length) {
    return (
      <AuctionGraphLayout
        viewSwitcher={viewSwitcher}
        startTime={startTime}
        setStartTime={setStartTime}
        chart={'No Results'}
      />
    )
  }

  return (
    <AuctionGraphLayout
      viewSwitcher={viewSwitcher}
      startTime={startTime}
      setStartTime={setStartTime}
      chartData={data}
      chart={
        <AuctionGraph
          chartData={data}
          startTime={startTime}
          setStartTime={setStartTime}
        />
      }
    />
  )
}
const AuctionGraphLayout = ({
  chart,
  viewSwitcher,
  startTime,
  setStartTime,
  chartData,
}: {
  chart?: ReactNode
  viewSwitcher?: ReactNode
  startTime: StartTimes
  setStartTime: (startTime: StartTimes) => void
  chartData?: AuctionHistory[]
}) => {
  const { isMobile } = useLayoutStore()
  const startTimeText = useMemo(() => {
    if (!chartData || !chartData.length) return '--'

    dayjs.extend(relativeTime)
    const date = dayjs.unix(chartData[0].endTime).fromNow()
    return date
  }, [chartData])

  return (
    <Flex className={auctionWrapVariants['post']}>
      {viewSwitcher}
      <Flex
        direction="column"
        alignSelf="center"
        justify={'center'}
        borderRadius={'phat'}
        borderStyle={'solid'}
        borderWidth={'normal'}
        borderColor={'border'}
        w={'100%'}
        style={{
          height: isMobile ? 'fit-content' : '464px',
          maxWidth: '912px',
        }}
      >
        <Box
          pos="relative"
          style={{
            maxWidth: '962px',
            height: '100%',
          }}
          py={{ '@initial': 'x2', '@768': 'x6' }}
          px={{ '@initial': 'x2', '@768': 'x6' }}
        >
          <Flex w={'100%'} justify={'space-between'} align="center">
            {isMobile || <Text variant="paragraph-sm">Auction History</Text>}
            <Flex>
              {Object.entries(StartTimes).map(([label, value]) => {
                const isActive = startTime === value

                return (
                  <Button
                    key={label}
                    variant="ghost"
                    size="xs"
                    px={'x3'}
                    className={isActive ? activeFilter : inactiveFilter}
                    onClick={() => setStartTime(value)}
                  >
                    {label}
                  </Button>
                )
              })}
            </Flex>
          </Flex>
          <Box style={{ height: '90%' }}>{chart}</Box>
          <Flex w={'100%'} justify={'space-between'}>
            <Text variant="paragraph-sm">{startTimeText}</Text>
            <Text variant="paragraph-sm">Now</Text>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

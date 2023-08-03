import { Box, Flex, Text } from '@zoralabs/zord'
import { color } from '@zoralabs/zord'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ethers } from 'ethers'
import { useMemo, useState } from 'react'

import { AuctionHistory } from 'src/data/subgraph/requests/auctionHistory'

const STROKE = 1.25

interface AuctionGraphProps {
  height?: number
  width?: number
  chartData: AuctionHistory[]
}

export const AuctionGraph = ({
  height = 200,
  width = 500,
  chartData,
}: AuctionGraphProps) => {
  const [visibleIndex, setVisibleIndex] = useState(10)

  const paddingX = 10
  const paddingY = 30
  const chartWidth = width - paddingX * 2
  const chartHeight = height - paddingY * 2

  const FONT_SIZE = width / 60

  const maximumYFromData = Math.max(...chartData.map((e) => Number(e.winningBidAmt)))

  const startTime = useMemo(() => {
    if (!chartData || !chartData.length) return '--'

    dayjs.extend(relativeTime)
    const date = dayjs.unix(chartData[0].endTime).fromNow()
    return date
  }, [chartData])

  const handleMouseMove = (e: any) => {
    const event = e.targetTouches ? e.targetTouches[0] : e
    const y = Math.max(
      0,
      event.pageX - e.currentTarget.getBoundingClientRect().left - paddingX
    )
    const index = Math.round(
      ((y - paddingY / 2) / (e.currentTarget.getBoundingClientRect().width - paddingY)) *
        chartData.length
    )
    setVisibleIndex(Math.max(0, Math.min(index, chartData.length - 1)))
  }

  const points = chartData
    .map((element, index) => {
      const PARTS = chartData.length
      const x = index * (chartWidth / PARTS) + paddingX
      // const x = (element.endTime / maximumXFromData) * chartWidth + paddingX
      const y =
        chartHeight -
        (Number(element.winningBidAmt) / maximumYFromData) * chartHeight +
        paddingY
      return `${x},${y}`
    })
    .join(' ')

  const XValues = () => {
    const PARTS = chartData.length
    return (
      <>
        {new Array(PARTS).fill(0).map((_, index) => {
          const x = index * (chartWidth / PARTS) + paddingX - FONT_SIZE / 2
          const y =
            chartHeight -
            (Number(chartData[index].winningBidAmt) / maximumYFromData) * chartHeight +
            paddingY -
            FONT_SIZE
          return (
            <Text
              key={index}
              as="text"
              x={x}
              y={y}
              variant="eyebrow"
              display={visibleIndex === index ? 'block' : 'none'}
            >
              {Number(ethers.utils.formatEther(chartData[index]?.winningBidAmt)).toFixed(
                2
              )}{' '}
              ETH
            </Text>
          )
        })}
      </>
    )
  }

  return (
    <Box
      pos="relative"
      borderRadius={'phat'}
      borderStyle={'solid'}
      borderWidth={'normal'}
      borderColor={'border'}
      style={{
        maxWidth: '962px',
      }}
      py={{ '@initial': 'x2', '@768': 'x6' }}
      px={{ '@initial': 'x2', '@768': 'x6' }}
    >
      <Text variant="paragraph-sm">Auction History</Text>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        onTouchMove={handleMouseMove}
        onMouseMove={handleMouseMove}
        style={{ overflow: 'visible' }}
      >
        <XValues />
        <Box
          as="circle"
          cx={visibleIndex * (chartWidth / chartData.length) + paddingX}
          cy={
            chartHeight -
            (Number(chartData[visibleIndex].winningBidAmt) / maximumYFromData) *
              chartHeight +
            paddingY
          }
          r="2"
          fill={color.accent}
        />
        <line
          stroke={color.accent}
          strokeWidth={STROKE}
          x1={visibleIndex * (chartWidth / chartData.length) + paddingX}
          x2={visibleIndex * (chartWidth / chartData.length) + paddingX}
          y1="0"
          y2={chartHeight + paddingY}
          opacity="0.2"
        />

        <polyline
          fill="none"
          stroke={color.accent}
          strokeWidth={STROKE}
          points={points}
        />
      </svg>
      <Flex w={'100%'} justify={'space-between'}>
        <Text variant="paragraph-sm">{startTime}</Text>

        <Text variant="paragraph-sm">Now</Text>
      </Flex>
    </Box>
  )
}

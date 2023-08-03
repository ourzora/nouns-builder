import { Box, Text } from '@zoralabs/zord'
import { color } from '@zoralabs/zord'
import { ethers } from 'ethers'
import { useState } from 'react'

import { AuctionHistory } from 'src/data/subgraph/requests/auctionHistory'

const STROKE = 1

interface AuctionGraphProps {
  height?: number
  width?: number
  chartData?: AuctionHistory[]
}

export const AuctionGraph = ({
  height = 200,
  width = 500,
  chartData,
}: AuctionGraphProps) => {
  const [visibleIndex, setVisibleIndex] = useState(10)

  if (!chartData || !chartData.length) return null

  const paddingX = 10
  const paddingY = 30
  const chartWidth = width - paddingX * 2
  const chartHeight = height - paddingY * 2

  const FONT_SIZE = width / 60

  const maximumXFromData = Math.max(...chartData.map((e) => e.endTime))
  const maximumYFromData = Math.max(...chartData.map((e) => Number(e.winningBidAmt)))

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
    <Box pos="relative">
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

      {/* <Text variant="paragraph-sm" pos="absolute" left="x1" bottom="x0">
        {formatDistance(chartData[0].time, Date.now(), { addSuffix: true })}
      </Text> */}
      <Text variant="paragraph-sm" pos="absolute" right="x1" bottom="x0">
        Now
      </Text>
    </Box>
  )
}

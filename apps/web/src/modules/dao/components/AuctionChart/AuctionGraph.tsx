import { Box, Text } from '@zoralabs/zord'
import { color } from '@zoralabs/zord'
import { ethers } from 'ethers'
import { useEffect, useRef, useState } from 'react'

import { AuctionHistory } from 'src/data/subgraph/requests/auctionHistory'

import { StartTimes } from './AuctionChart'

const STROKE = 1

interface AuctionGraphProps {
  height?: number
  width?: number
  startTime: StartTimes
  setStartTime: (startTime: StartTimes) => void
  chartData: AuctionHistory[]
}

export const AuctionGraph = ({
  height = 220,
  width = 500,
  chartData,
  startTime,
  setStartTime,
}: AuctionGraphProps) => {
  const [visibleIndex, setVisibleIndex] = useState(0)
  const paddingX = 10
  const paddingY = 30
  const chartWidth = width - paddingX * 2
  const chartHeight = height - paddingY * 2

  const FONT_SIZE = width / 60

  const maximumYFromData = Math.max(...chartData.map((e) => Number(e.winningBidAmt)))
  const lineRef = useRef<SVGPolylineElement | null>(null)

  useEffect(() => {
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength()
      lineRef.current.style.strokeDasharray = `${length} ${length}`
      lineRef.current.style.strokeDashoffset = length.toString()
      lineRef.current.style.opacity = '0'
      setTimeout(() => {
        lineRef.current!.style.transition =
          'stroke-dashoffset 1.5s ease-in-out, opacity 1.5s ease-in-out'
        lineRef.current!.style.strokeDashoffset = '0'
        lineRef.current!.style.opacity = '1'
      }, 100)
    }
  }, [])

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
              fontSize={12}
              key={index}
              as="text"
              variant="eyebrow"
              x={x}
              y={y - 10}
              backgroundColor={'accent'}
              display={visibleIndex === index ? 'block' : 'none'}
            >
              {Number(ethers.utils.formatEther(chartData[index]?.winningBidAmt)).toFixed(
                4
              )}{' '}
              ETH
            </Text>
          )
        })}
      </>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      onTouchMove={handleMouseMove}
      onMouseMove={handleMouseMove}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="smooth">
          <feGaussianBlur in="SourceGraphic" stdDeviation=".3" />
        </filter>
      </defs>
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
        r="3"
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
        key={startTime}
        ref={lineRef}
        fill="none"
        stroke={chartData ? color.accent : 'transparent'}
        strokeWidth={STROKE}
        points={points}
        style={{
          opacity: '0',
          strokeDasharray: '1000 1000', // Some large number to initially hide the line
          strokeDashoffset: '1000', // Same large number to initially hide the line
        }}
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#smooth)"
      />
    </svg>
  )
}

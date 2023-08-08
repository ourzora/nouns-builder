import { Box, Text } from '@zoralabs/zord'
import { color } from '@zoralabs/zord'
import { ethers } from 'ethers'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { AuctionHistory } from 'src/data/subgraph/requests/auctionHistory'
import { useLayoutStore } from 'src/stores'

import { StartTimes } from './AuctionChart'
import { graphOnLoadStyles, svgBox } from './AuctionChart.css'
import {
  calculateVisibleIndex,
  calculateY,
  getMouseEventSource,
  getTouchEventSource,
  isTouchEvent,
} from './auctionChartUtils'

const STROKE = 1
const paddingX = 10
const paddingY = 30

type AuctionGraphProps = {
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
}: AuctionGraphProps) => {
  const [visibleIndex, setVisibleIndex] = useState(0)
  const chartWidth = width - paddingX * 2
  const chartHeight = height - paddingY * 2

  const { isMobile } = useLayoutStore()
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

  const points = useMemo(
    () =>
      chartData
        .map((element, index) => {
          const parts = chartData.length
          const x = index * (chartWidth / parts) + paddingX
          const y =
            chartHeight -
            (Number(element.winningBidAmt) / maximumYFromData) * chartHeight +
            paddingY

          return `${x},${y}`
        })
        .join(' '),
    [chartData, chartWidth, paddingX, paddingY, chartHeight, maximumYFromData]
  )

  const handleMouseMove = (
    e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>
  ) => {
    const event = isTouchEvent(e) ? getTouchEventSource(e) : getMouseEventSource(e)
    const y = calculateY(event, e, paddingX)
    const visibleIndex = calculateVisibleIndex(y, e, paddingY, chartData.length)

    setVisibleIndex(visibleIndex)
  }
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      onTouchMove={handleMouseMove}
      onMouseMove={handleMouseMove}
      className={svgBox}
    >
      <defs>
        <filter id="smooth">
          <feGaussianBlur in="SourceGraphic" stdDeviation=".3" />
        </filter>
      </defs>
      <XValues
        chartData={chartData}
        chartWidth={chartWidth}
        paddingX={paddingX}
        paddingY={paddingY}
        width={width}
        visibleIndex={visibleIndex}
        maximumYFromData={maximumYFromData}
        chartHeight={chartHeight}
        isMobile={isMobile}
      />
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
        className={graphOnLoadStyles}
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#smooth)"
      />
    </svg>
  )
}

type XValuesProps = {
  chartData: AuctionHistory[]
  chartWidth: number
  paddingX: number
  paddingY: number
  width: number
  visibleIndex: number
  maximumYFromData: number
  chartHeight: number
  isMobile: boolean
}

const XValues = React.memo(
  ({
    chartData,
    chartWidth,
    paddingX,
    paddingY,
    width,
    visibleIndex,
    maximumYFromData,
    chartHeight,
    isMobile,
  }: XValuesProps) => {
    const FONT_SIZE = width / (isMobile ? 36 : 60)
    const parts = chartData.length
    return (
      <>
        {new Array(parts).fill(0).map((_, index) => {
          const x = index * (chartWidth / parts) + paddingX - FONT_SIZE / 2
          const y =
            chartHeight -
            (Number(chartData[index].winningBidAmt) / maximumYFromData) * chartHeight +
            paddingY -
            FONT_SIZE
          return (
            <Text
              fontSize={isMobile ? 20 : 12}
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
)

import { fetchExpenditures } from './queries/fetchExpenditures'
import { fetchPartitions } from './queries/fetchPartitions'
import { Box, Flex, Text, ThemeProvider, lightTheme } from '@zoralabs/zord'
import React, { useMemo } from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
// import { PieChart } from 'react-minimal-pie-chart'
import { QueryType, TREASURY_SNAPSHOT } from 'src/utils/constants'
import { Expenditure, Partition } from 'src/utils/types'
import useSWR from 'swr'
import { formatEther } from 'viem'

type Slice = {
  title: string
  value: number
  color: string
  partitionType: string
  partitionName: string
  partitionTotal: number
}

type SegmentData = {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
  name: string
}

const COLORS = ['0,227,124', '138,217,250', '249,144,68', '205,238,0', '173,116,255']
const RADIAN = Math.PI / 180
const createDisplayData = (partitions: Partition[], expenditures: Expenditure[]) => {
  let totalDisplay = []
  let spendingDisplay = []

  const treasuryInEth = formatEther(TREASURY_SNAPSHOT.AMOUNT)

  for (let index in partitions) {
    const partition = partitions[index]
    const partitionTotal = Number(treasuryInEth) * (partition.allocation / 100)

    const total = {
      name: partition.name,
      value: partitionTotal,
      partitionTotal,
      partitionType: 'total',
      partitionName: partition.name,
    }

    const spent = expenditures
      .filter((expenditure) => expenditure.partition === partition.name)
      .reduce((acc, curr) => ({ ...acc, value: acc.value + curr.amount }), {
        name: `Spent ${partition.name}`,
        value: 0,
        color: `rgba(${COLORS[index]}, 0.5)`,
        partitionType: 'spent',
        partitionName: partition.name,
        partitionTotal,
      })

    const unspent = {
      name: `Unspent ${partition.name}`,
      value: partitionTotal - spent.value,
      color: `rgba(${COLORS[index]},0.3)`,
      partitionType: 'unspent',
      partitionName: partition.name,
      partitionTotal,
    }
    totalDisplay.push(total)
    spendingDisplay.push([unspent, spent])
  }

  return {
    total: totalDisplay,
    spending: spendingDisplay.flat(),
  }
}

const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: SegmentData) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.3
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const Partitions = () => {
  const {
    data: partitions,
    error: partError,
    isValidating: partLoading,
  } = useSWR(QueryType.Partitions, fetchPartitions, {
    revalidateOnFocus: false,
  })
  const {
    data: expenditures,
    error: spendError,
    isValidating: spendLoading,
  } = useSWR(QueryType.Expenditures, fetchExpenditures, {
    revalidateOnFocus: false,
  })

  const graphValues = useMemo(() => {
    if (!partitions || !expenditures) return

    return createDisplayData(partitions, expenditures)
  }, [partitions, expenditures])

  if (partError || spendError)
    return <div>{partError?.message || spendError?.message}</div>
  if (partLoading || spendLoading || !partitions || !expenditures || !graphValues)
    return <div>Loading...</div>

  return (
    <ThemeProvider theme={lightTheme}>
      <Flex direction="column" align={'center'} justify={'center'}>
        <Text fontFamily={'heading'} fontSize={80} mb={'x10'} mt={'x6'}>
          Builder DAO Partitions
        </Text>
        <Box style={{ height: '750px', width: '900px' }}>
          <ResponsiveContainer height={'100%'} width={'100%'}>
            <PieChart height={750} width={900}>
              <Tooltip content={CustomTooltip} />
              <Pie
                data={graphValues.total}
                dataKey="value"
                nameKey="title"
                cx="50%"
                cy="50%"
                outerRadius={200}
                fill="#8884d8"
                labelLine={false}
                label={renderCustomLabel}
              />
              <Pie
                data={graphValues.spending}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={220}
                outerRadius={270}
                fill="#82ca9d"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Flex>
    </ThemeProvider>
  )
}
export default Partitions

type CustomTooltipProps = {
  active?: boolean
  payload?: any
  label?: string
}

const CustomTooltip = (data: any) => {
  const { active, payload, label } = data
  if (active && payload && payload.length) {
    const name = payload[0].payload.name
    const value = payload[0].value.toFixed(2)
    console.log('data', data)
    return (
      <Box
        className="custom-tooltip"
        style={{
          backgroundColor: 'white',
          opacity: '0.7',
        }}
        p={'x2'}
        borderRadius={'curved'}
      >
        <Text className="label">
          <b>Partition</b> : {name}
        </Text>
        <Text className="intro">{payload[0].payload.name}</Text>
        <Text className="desc">Anything you want can be displayed here.</Text>
      </Box>
    )
  }

  return null
}

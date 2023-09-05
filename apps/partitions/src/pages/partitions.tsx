import { fetchExpenditures } from './queries/fetchExpenditures'
import { fetchPartitions } from './queries/fetchPartitions'
import { Box, Flex, Text, ThemeProvider, lightTheme } from '@zoralabs/zord'
import React, { useMemo } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
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

const COLORS = ['0,227,124', '138,217,250', '249,144,68', '205,238,0', '173,116,255']

const createDisplayData = (partitions: Partition[], expenditures: Expenditure[]) => {
  let displayData = []

  const treasuryInEth = formatEther(TREASURY_SNAPSHOT.AMOUNT)

  for (let index in partitions) {
    const partition = partitions[index]
    const partitionTotal = Number(treasuryInEth) * (partition.allocation / 100)

    const spent = expenditures
      .filter((expenditure) => expenditure.partition === partition.name)
      .reduce((acc, curr) => ({ ...acc, value: acc.value + curr.amount }), {
        title: `Spent ${partition.name}`,
        value: 0,
        color: `rgb(${COLORS[index]})`,
        partitionType: 'spent',
        partitionName: partition.name,
        partitionTotal,
      })

    const unspent = {
      title: `Unspent ${partition.name}`,
      value: partitionTotal - spent.value,
      color: `rgba(${COLORS[index]},0.5)`,
      partitionType: 'unspent',
      partitionName: partition.name,
      partitionTotal,
    }

    displayData.push([unspent, spent])
  }

  return displayData.flat()
}

const Partitions = () => {
  const {
    data: partitions,
    error: partError,
    isValidating: partLoading,
  } = useSWR(QueryType.Partitions, fetchPartitions)
  const {
    data: expenditures,
    error: spendError,
    isValidating: spendLoading,
  } = useSWR(QueryType.Expenditures, fetchExpenditures)

  const graphValues = useMemo(() => {
    if (!partitions || !expenditures) return

    return createDisplayData(partitions, expenditures)
  }, [partitions, expenditures])

  if (partError || spendError)
    return <div>{partError?.message || spendError?.message}</div>
  if (partLoading || spendLoading || !partitions || !expenditures || !graphValues)
    return <div>Loading...</div>
  console.log('graphValues', graphValues)
  return (
    <ThemeProvider theme={lightTheme}>
      <Flex direction="column" align={'center'} justify={'center'}>
        <Text fontSize={80} mb={'x10'} mt={'x6'}>
          Builder DAO Partitions
        </Text>
        <Box style={{ height: '600px', width: '600px' }}>
          <PieChart
            totalValue={Number(formatEther(TREASURY_SNAPSHOT.AMOUNT))}
            label={({ dataEntry }) => `${dataEntry.title}`}
            labelStyle={{
              fontSize: '3px',
            }}
            data={graphValues.map(({ title, value, color }) => ({
              title,
              value,
              color,
            }))}
          />
        </Box>
      </Flex>
    </ThemeProvider>
  )
}
export default Partitions

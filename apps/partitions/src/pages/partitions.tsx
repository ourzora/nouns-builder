import { fetchExpenditures } from './queries/fetchExpenditures'
import { fetchPartitions } from './queries/fetchPartitions'
import { Box, Flex, Text, ThemeProvider, lightTheme } from '@zoralabs/zord'
import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { QueryType } from 'src/utils/constants'
import useSWR from 'swr'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

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

  if (partError || spendError)
    return <div>{partError?.message || spendError?.message}</div>
  if (partLoading || spendLoading || !partitions || !expenditures)
    return <div>Loading...</div>

  console.log('expenditures', expenditures)

  return (
    <ThemeProvider theme={lightTheme}>
      <Flex direction="column" align={'center'} justify={'center'}>
        <Text fontFamily="heading" fontSize={80} mb={'x10'} mt={'x6'}>
          Builder DAO Partitions
        </Text>
        <Box style={{ height: '600px', width: '600px' }}>
          <PieChart
            label={({ dataEntry }) =>
              `${dataEntry.title} - ${Math.round(dataEntry.value)}%`
            }
            labelStyle={{
              fontSize: '5px',
            }}
            animate
            lengthAngle={360}
            data={partitions.map((row, index) => ({
              title: row.name,
              value: row.allocation,
              color: COLORS[index],
            }))}
          />
        </Box>
      </Flex>
    </ThemeProvider>
  )
}
export default Partitions

import { Box, Flex, Text, ThemeProvider, lightTheme } from '@zoralabs/zord'
import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import useSWR from 'swr'

type Partition = { name: string; description: string; allocation: number }

const fetchPartitions = async (): Promise<Partition[]> => {
  const res = await fetch('/api/partitions')
  const data = await res.json()
  // const headers = data.values[0] as string[];
  const rows = data.values.slice(1) as string[][]

  if (!Array.isArray(data.values)) throw new Error('Invalid data')
  const partitions = rows.map((row) => {
    return {
      name: row[0] as string,
      description: row[1] as string,
      allocation: Number(row[2]) as number,
    }
  })
  return partitions.filter(
    (partition) =>
      partition.name &&
      partition.description &&
      partition.allocation &&
      typeof partition.name === 'string' &&
      typeof partition.description === 'string' &&
      typeof partition.allocation === 'number'
  )
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const Partitions = () => {
  const { data, error } = useSWR('/api/partitions', fetchPartitions)

  if (error) return <div>{error?.message}</div>
  if (!data) return <div>Loading...</div>
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
            data={data.map((row, index) => ({
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

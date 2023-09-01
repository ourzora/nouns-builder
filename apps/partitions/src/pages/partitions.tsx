import { Button, Flex, Text, ThemeProvider, lightTheme } from '@zoralabs/zord'
import React from 'react'
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

const Partitions = () => {
  const { data, error } = useSWR('/api/partitions', fetchPartitions)

  if (error) return <div>{error?.message}</div>
  if (!data) return <div>Loading...</div>
  return (
    <ThemeProvider theme={lightTheme}>
      <Flex>
        <Text fontSize={80}>Hello world!</Text>
        <Button>Text</Button>
      </Flex>
    </ThemeProvider>
  )
}
export default Partitions

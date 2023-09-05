import { QueryType } from 'src/utils/constants'
import { Partition } from 'src/utils/types'

export const fetchPartitions = async (): Promise<Partition[]> => {
  const res = await fetch(`/api/sheetQuery?sheetName=${QueryType.Partitions}`)
  const data = await res.json()
  const rows = data.values.slice(1) as string[][]

  if (!Array.isArray(data.values)) throw new Error('Invalid data')
  return rows.map((row) => {
    return {
      name: row[0] as string,
      description: row[1] as string,
      allocation: Number(row[2]) as number,
    }
  })
}

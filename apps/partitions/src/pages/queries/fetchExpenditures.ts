import { QueryType } from 'src/utils/constants'
import { Expenditure } from 'src/utils/types'

export const fetchExpenditures = async (): Promise<Expenditure[]> => {
  const res = await fetch(`/api/sheetQuery?sheetName=${QueryType.Expenditures}`)
  const data = await res.json()
  const rows = data.values.slice(1) as string[][]

  if (!Array.isArray(data.values)) throw new Error('Invalid data')
  return rows.map((row) => ({
    propId: Number(row[0]),
    partition: row[1],
    label: row[2],
    amount: Number(row[3]),
    description: row[4],
  }))
}

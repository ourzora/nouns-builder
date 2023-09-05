export type Partition = { name: string; description: string; allocation: number }
export type Expenditure = {
  propId: number
  partition: string
  amount: number
  label: string
  description: string
}

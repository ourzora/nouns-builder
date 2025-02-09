import { TokenAllocation } from '../components/AllocationForm'

export const formatFounderAllocation = (
  { founderAddress, allocationPercentage, endDate }: TokenAllocation
): string => {
  return `${founderAddress} will receive ${allocationPercentage}% of Tokens, until ${endDate}.`
}

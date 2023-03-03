import { TokenAllocation } from 'src/typings'

export const formatFounderAllocation = ({
  founderAddress,
  allocationPercentage,
  endDate,
}: TokenAllocation): string => {
  return `${founderAddress} will receive ${allocationPercentage}% of Tokens, until ${endDate}.`
}

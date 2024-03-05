import { useContractRead } from 'wagmi'

import { governorAbi } from 'src/data/contract/abis'
import { AddressType, CHAIN_ID } from 'src/typings'

export const useDelayedGovernance = ({
  governorAddress,
  chainId,
}: {
  governorAddress?: AddressType
  chainId: CHAIN_ID
}) => {
  const { data: delayedUntilTimestamp } = useContractRead({
    abi: governorAbi,
    address: governorAddress,
    chainId,
    functionName: 'delayedGovernanceExpirationTimestamp',
  })

  const isGovernanceDelayed = delayedUntilTimestamp
    ? new Date().getTime() < Number(delayedUntilTimestamp) * 1000
    : false

  return { delayedUntilTimestamp, isGovernanceDelayed }
}

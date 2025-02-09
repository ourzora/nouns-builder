import { useContractRead } from 'wagmi'

import { governorAbi, tokenAbi } from 'src/data/contract/abis'
import { AddressType, CHAIN_ID } from 'src/typings'

export const useDelayedGovernance = (
  {
    tokenAddress,
    governorAddress,
    chainId,
  }: {
    tokenAddress?: AddressType
    governorAddress?: AddressType
    chainId: CHAIN_ID
  }
) => {
  const { data: delayedUntilTimestamp } = useContractRead({
    abi: governorAbi,
    address: governorAddress,
    chainId,
    functionName: 'delayedGovernanceExpirationTimestamp',
  })

  const { data: remainingTokensInReserve } = useContractRead({
    abi: tokenAbi,
    address: tokenAddress,
    chainId,
    functionName: 'remainingTokensInReserve',
  })

  if (remainingTokensInReserve === 0n)
    return { delayedUntilTimestamp: 0, isGovernanceDelayed: false }

  const isGovernanceDelayed = delayedUntilTimestamp
    ? new Date().getTime() < Number(delayedUntilTimestamp) * 1000
    : false

  return { delayedUntilTimestamp, isGovernanceDelayed }
}

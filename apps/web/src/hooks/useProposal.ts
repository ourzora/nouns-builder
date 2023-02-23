import { useDaoStore } from 'src/modules/dao'
import { useContractReads } from 'wagmi'
import { governorAbi } from 'src/data/contract/abis'
import { AddressType } from 'src/typings'

export function useProposal(_proposalId: `0x${string}`) {
  const { addresses } = useDaoStore()

  const governorContract = {
    address: addresses?.governor as AddressType,
    abi: governorAbi,
    args: [_proposalId],
  }

  const functionNames = [
    'state',
    'queue',
    'proposalDeadline',
    'proposalEta',
    'proposalVotes',
  ]

  const { data, ...rest } = useContractReads({
    contracts: functionNames.map((func) => ({ ...governorContract, functionName: func })),
  })

  if (!data) {
    return {
      data,
      ...rest,
    }
  }

  const [state, queue, proposalDeadline, proposalEta, proposalVotes] = data
  return {
    data: { state, queue, proposalDeadline, proposalEta, proposalVotes },
    ...rest,
  }
}

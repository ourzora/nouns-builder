import { readContract } from '@wagmi/core'

import { AddressType, BytesType, Chain } from 'src/typings'

import { governorAbi } from '../abis'

export enum ProposalState {
  Pending = 0,
  Active = 1,
  Canceled = 2,
  Defeated = 3,
  Succeeded = 4,
  Queued = 5,
  Expired = 6,
  Executed = 7,
  Vetoed = 8,
}

export const getProposalState = async (
  chain: Chain,
  governorAddress: AddressType,
  proposalId: BytesType
) => {
  const baseParams = { address: governorAddress, abi: governorAbi, chainId: chain.id }
  return (await readContract({
    ...baseParams,
    functionName: 'state',
    args: [proposalId],
  })) as ProposalState
}

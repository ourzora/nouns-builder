import isNil from 'lodash/isNil'
import { useContractReads } from 'wagmi'

import { governorAbi, tokenAbi } from 'src/data/contract/abis'
import { AddressType, Chain } from 'src/typings'

export const useVotes = ({
  chain,
  collectionAddress,
  governorAddress,
  signerAddress,
}: {
  chain: Chain
  collectionAddress?: AddressType
  governorAddress?: AddressType
  signerAddress?: AddressType
}) => {
  const { data, isLoading } = useContractReads({
    enabled: !!chain && !!collectionAddress && !!governorAddress && !!signerAddress,
    contracts: [
      {
        address: collectionAddress,
        abi: tokenAbi,
        functionName: 'getVotes',
        args: [signerAddress as AddressType],
        chainId: chain.id,
      },
      {
        address: collectionAddress,
        abi: tokenAbi,
        functionName: 'delegates',
        args: [signerAddress as AddressType],
        chainId: chain.id,
      },
      {
        address: governorAddress,
        abi: governorAbi,
        functionName: 'proposalThreshold',
        chainId: chain.id,
      },
    ] as const,
  })

  if (!data || isLoading || data.some(isNil)) {
    return {
      isLoading,
      isOwner: false,
      hasThreshold: false,
    }
  }

  const [votes, delegates, proposalThreshold] = data

  return {
    isLoading,
    isDelegating: delegates !== signerAddress,
    isOwner: votes.toNumber() > 0,
    hasThreshold: votes.toNumber() > proposalThreshold.toNumber(),
    proposalVotesRequired: proposalThreshold.toNumber() + 1,
  }
}

import isNil from 'lodash/isNil'
import { useContractReads } from 'wagmi'

import { governorAbi, tokenAbi } from 'src/data/contract/abis'
import { AddressType } from 'src/typings'

export const useVotes = ({
  collectionAddress,
  governorAddress,
  signerAddress,
}: {
  collectionAddress?: AddressType
  governorAddress?: AddressType
  signerAddress?: AddressType
}) => {
  const { data, isLoading } = useContractReads({
    enabled: !!collectionAddress && !!governorAddress && !!signerAddress,
    contracts: [
      {
        address: collectionAddress,
        abi: tokenAbi,
        functionName: 'getVotes',
        args: [signerAddress as AddressType],
      },
      {
        address: collectionAddress,
        abi: tokenAbi,
        functionName: 'delegates',
        args: [signerAddress as AddressType],
      },
      {
        address: governorAddress,
        abi: governorAbi,
        functionName: 'proposalThreshold',
      },
    ],
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
    isOwner: votes.toNumber() > proposalThreshold.toNumber(),
    hasThreshold: votes.toNumber() > 0,
  }
}

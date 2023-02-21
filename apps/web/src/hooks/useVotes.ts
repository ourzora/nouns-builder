import { AddressType } from 'src/typings'
import { useContractReads } from 'wagmi'
import { governorAbi, tokenAbi } from 'src/constants/abis'
import isNil from 'lodash/isNil'

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
        address: governorAddress,
        abi: governorAbi,
        functionName: 'proposalThreshold',
      },
    ],
  })

  if (!data || isLoading || data.some(isNil)) {
    return {
      isOwner: false,
      hasThreshold: false,
    }
  }

  const [votes, proposalThreshold] = data

  return {
    isOwner: votes.toNumber() > proposalThreshold.toNumber(),
    hasThreshold: votes.toNumber() > 0,
  }
}

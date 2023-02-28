import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi'

import { walletSnippet } from 'src/utils/helpers'

export const useEnsData = (address?: string) => {
  const { data: ensName, isLoading: ensNameLoading } = useEnsName({
    address: address as `0x${string}`,
  })

  const { data: ensAvatar } = useEnsAvatar({
    address: address as `0x${string}`,
  })

  const { data: ensAddress } = useEnsAddress({
    name: address,
  })

  return {
    ensName,
    ensNameLoading,
    ensAvatar,
    ethAddress: ensAddress,
    displayName: ensName || walletSnippet(address),
  }
}

import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi'

import { CHAIN_ID } from 'src/typings'
import { walletSnippet } from 'src/utils/helpers'

export const useEnsData = (address?: string) => {
  const { data: ensName, isLoading: ensNameLoading } = useEnsName({
    address: address as `0x${string}`,
    chainId: CHAIN_ID.ETHEREUM,
  })

  const { data: ensAvatar } = useEnsAvatar({
    address: address as `0x${string}`,
    chainId: CHAIN_ID.ETHEREUM,
  })

  const { data: ensAddress } = useEnsAddress({
    name: address,
    chainId: CHAIN_ID.ETHEREUM,
  })

  return {
    ensName,
    ensNameLoading,
    ensAvatar,
    ethAddress: ensAddress,
    displayName: ensName || walletSnippet(address),
  }
}

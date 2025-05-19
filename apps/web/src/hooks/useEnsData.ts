import { useMemo } from 'react'
import { Address, isAddress } from 'viem'
import { useEnsAddress, useEnsAvatar, useEnsName } from 'wagmi'

import { useChainStore } from 'src/stores/useChainStore'
import { CHAIN_ID } from 'src/typings'
import { walletSnippet } from 'src/utils/helpers'

type EnsData = {
  ensName?: string
  ensAvatar?: string
  ethAddress?: Address
  ensNameLoading?: boolean
  displayName: string
}

export const useEnsData = (addressOrName?: string): EnsData => {
  const isAddressValid = !!addressOrName && isAddress(addressOrName)
  const inputAddress = isAddressValid ? (addressOrName as Address) : undefined
  const inputName = isAddressValid ? undefined : (addressOrName as string)

  const chain = useChainStore((x) => x.chain)

  const chainId = chain.id == CHAIN_ID.FOUNDRY ? CHAIN_ID.FOUNDRY : CHAIN_ID.ETHEREUM

  const { data: ensName, isLoading: ensNameLoading } = useEnsName({
    address: inputAddress,
    chainId,
    enabled: !!inputAddress,
  })

  const { data: ensAddress } = useEnsAddress({
    name: inputName,
    chainId,
    enabled: !!inputName,
  })

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? inputName,
    chainId,
    enabled: !!ensName || !!inputName,
  })

  const ethAddress = useMemo(() => {
    return inputAddress ?? ensAddress ?? undefined
  }, [inputAddress, ensAddress])

  const finalEnsName = useMemo(() => {
    return ensName ?? (ensAddress ? inputName : undefined)
  }, [ensName, ensAddress, inputName])

  const displayName = useMemo(() => {
    return finalEnsName ?? (addressOrName ? walletSnippet(addressOrName) : '')
  }, [finalEnsName, addressOrName])

  return {
    ensName: finalEnsName,
    ensNameLoading,
    ensAvatar: ensAvatar ?? undefined,
    ethAddress,
    displayName,
  }
}

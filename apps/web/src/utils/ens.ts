import { Address, PublicClient, isAddress } from 'viem'

import { CHAIN_ID } from 'src/typings'
import { getChainFromLocalStorage } from 'src/utils/getChainFromLocalStorage'

import { getProvider } from './provider'

const defaultProvider = getProvider(CHAIN_ID.ETHEREUM)

export type IsValidAddressResult = {
  data: boolean
  error?: string
}

export async function isValidAddress(
  address: Address,
  provider: PublicClient | undefined = defaultProvider
): Promise<IsValidAddressResult> {
  try {
    if (isAddress(address)) return { data: true }

    const { id: chainId } = getChainFromLocalStorage()

    let resolvedName: string | null

    if (chainId === CHAIN_ID.ETHEREUM || chainId === CHAIN_ID.GOERLI) {
      resolvedName = await provider?.getEnsName({ address })
    } else {
      const [nameResponse, codeResponse] = await Promise.all([
        provider?.getEnsName(address),
        provider?.getBytecode(address),
      ])

      if (codeResponse !== '0x')
        return { data: false, error: 'ENS for contracts is not supported on L2' }

      resolvedName = nameResponse
    }

    return {
      data: !!resolvedName,
      error: resolvedName ? undefined : 'Invalid address',
    }
  } catch {
    return { data: false, error: 'Invalid address' }
  }
}

export async function getEnsAddress(
  nameOrAddress: string,
  provider: PublicClient | undefined = defaultProvider
) {
  let resolvedName
  try {
    resolvedName = await provider?.getEnsAddress({ name: nameOrAddress })
  } catch (e) {
    console.log(e)
  }

  return resolvedName ?? nameOrAddress
}

export async function getEnsName(
  address: Address,
  provider: PublicClient | undefined = defaultProvider
) {
  return await provider?.getEnsName({ address })
}

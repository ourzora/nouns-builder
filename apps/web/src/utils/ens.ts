import { Provider } from '@ethersproject/abstract-provider'
import { ethers } from 'ethers'

import { RPC_URL } from 'src/constants/rpc'
import { CHAIN_ID } from 'src/typings'
import { getChainFromLocalStorage } from 'src/utils/getChainFromLocalStorage'

const defaultProvider: Provider = new ethers.providers.JsonRpcProvider(
  RPC_URL[CHAIN_ID.ETHEREUM]
)

export type IsValidAddressResult = {
  data: boolean
  error?: string
}

export async function isValidAddress(
  address: string,
  provider: Provider | undefined = defaultProvider
): Promise<IsValidAddressResult> {
  try {
    if (ethers.utils.isAddress(address)) return { data: true }

    const { id: chainId } = getChainFromLocalStorage()

    let resolvedName: string | null

    if (chainId === CHAIN_ID.ETHEREUM || chainId === CHAIN_ID.GOERLI) {
      resolvedName = await provider?.resolveName(address)
    } else {
      const [nameResponse, codeResponse] = await Promise.all([
        provider?.resolveName(address),
        provider?.getCode(address),
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
  address: string,
  provider: Provider | undefined = defaultProvider
) {
  let resolvedName
  try {
    resolvedName = await provider?.resolveName(address)
  } catch (e) {
    console.log(e)
  }

  return resolvedName ?? address
}

export async function getEnsName(
  address: string,
  provider: Provider | undefined = defaultProvider
) {
  return await provider?.lookupAddress(address)
}

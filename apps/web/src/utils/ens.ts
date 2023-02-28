import { Provider } from '@ethersproject/abstract-provider'
import { ethers } from 'ethers'

import { ALCHEMY_RPC_URL } from 'src/constants/rpc'

const defaultProvider: Provider = new ethers.providers.JsonRpcProvider(ALCHEMY_RPC_URL)

export async function isValidAddress(
  address: string,
  provider: Provider | undefined = defaultProvider
) {
  try {
    const resolvedName = await provider?.resolveName(address)
    return !!resolvedName || ethers.utils.isAddress(address)
  } catch {
    return false
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

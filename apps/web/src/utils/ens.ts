import { Address, PublicClient, isAddress } from 'viem'

import { CHAIN_ID } from 'src/typings'

import { getProvider } from './provider'

const defaultProvider = getProvider(CHAIN_ID.ETHEREUM)

export type IsValidAddressResult = {
  data: boolean
  error?: string
}

/**
 * Checks if a string is a valid Ethereum address or a resolvable ENS name.
 */
export async function isValidAddress(
  input: string,
  provider: PublicClient | undefined = defaultProvider,
  errorMessage = 'Must be a valid Ethereum address or resolvable ENS name'
): Promise<IsValidAddressResult> {
  try {
    if (isAddress(input)) return { data: true }

    const resolved = await provider?.getEnsAddress({ name: input })
    return {
      data: !!resolved,
      error: resolved ? undefined : errorMessage,
    }
  } catch {
    return { data: false, error: errorMessage }
  }
}

// In-memory ENS resolution cache
const ensAddressCache = new Map<string, string>()

export async function getEnsAddress(
  nameOrAddress: string,
  provider: PublicClient | undefined = defaultProvider
): Promise<string> {
  if (!nameOrAddress) return nameOrAddress

  if (isAddress(nameOrAddress)) return nameOrAddress

  // Check cache
  if (ensAddressCache.has(nameOrAddress)) {
    return ensAddressCache.get(nameOrAddress)!
  }

  try {
    const resolved = await provider.getEnsAddress({ name: nameOrAddress })
    const result = resolved ?? nameOrAddress
    ensAddressCache.set(nameOrAddress, result)
    return result
  } catch (e) {
    console.error('Error getting ENS address:', e)
    return nameOrAddress
  }
}

// In-memory reverse ENS cache
const ensNameCache = new Map<Address, string | null>()

export async function getEnsName(
  address: Address,
  provider: PublicClient | undefined = defaultProvider
): Promise<string> {
  if (!address) return address

  // Check cache
  if (ensNameCache.has(address)) {
    return ensNameCache.get(address)!
  }

  try {
    const name = await provider.getEnsName({ address })
    const result = name ?? address
    ensNameCache.set(address, result)
    return result
  } catch (e) {
    console.error('Error getting ENS name:', e)
    return address
  }
}

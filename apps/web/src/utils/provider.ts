import type { Provider } from '@ethersproject/abstract-provider'
import { ethers } from 'ethers'

import { RPC_URL } from 'src/constants/rpc'
import { CHAIN_ID } from 'src/typings'

let provider: Map<CHAIN_ID, Provider>

export function getProvider(chainId: CHAIN_ID): Provider {
  if (!provider) provider = new Map()
  if (!provider.has(chainId)) {
    provider = new Map()
    // Use static provider to prevent re-querying for chain id since this won't change
    provider.set(chainId, new ethers.providers.StaticJsonRpcProvider(RPC_URL[chainId]))
  }
  return provider.get(chainId)!
}

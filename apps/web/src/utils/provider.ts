import type { Provider } from '@ethersproject/abstract-provider'
import { ethers } from 'ethers'

import { RPC_URL } from 'src/constants/rpc'
import { CHAIN_ID } from 'src/typings'

let providerMap: Map<CHAIN_ID, Provider>

export function getProvider(chainId: CHAIN_ID): Provider {
  if (!providerMap) providerMap = new Map()
  if (!providerMap.has(chainId)) {
    // Use static provider to prevent re-querying for chain id since this won't change
    providerMap.set(chainId, new ethers.providers.StaticJsonRpcProvider(RPC_URL[chainId]))
  }
  return providerMap.get(chainId)!
}

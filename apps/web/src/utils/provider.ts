import type { Provider } from '@ethersproject/abstract-provider'
import { ethers } from 'ethers'

import { RPC_URL } from 'src/constants/rpc'
import { CHAIN_ID } from 'src/typings'

let provider: undefined | Provider

export function getProvider(chain: CHAIN_ID): Provider {
  if (!provider) {
    // Use static provider to prevent re-querying for chain id since this won't change
    provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL[chain])
  }
  return provider
}

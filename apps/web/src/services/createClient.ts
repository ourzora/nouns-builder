import { createTestClient, http, publicActions, walletActions } from 'viem'

import { PUBLIC_ALL_CHAINS } from 'src/constants/defaultChains'
import { CHAIN_ID } from 'src/typings'

export const createClient = (forkId: string, chainId: CHAIN_ID) => {
  return createTestClient({
    mode: 'hardhat',
    chain: PUBLIC_ALL_CHAINS.find((x) => x.id === chainId),
    transport: http(`https://rpc.tenderly.co/fork/${forkId}`),
  })
    .extend(publicActions)
    .extend(walletActions)
}

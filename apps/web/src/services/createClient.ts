import { createTestClient, http, publicActions, walletActions } from 'viem'

export const createClient = (forkId: any) => {
  return createTestClient({
    mode: 'anvil',
    transport: http(`https://rpc.tenderly.co/fork/${forkId}`),
  })
    .extend(publicActions)
    .extend(walletActions)
}

import { foundry } from 'wagmi/chains'

import { CHAIN_ID } from 'src/typings'

export const RPC_URL = {
  [CHAIN_ID.ETHEREUM]: ` https://mainnet.gateway.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_RPC_KEY}`,
  [CHAIN_ID.OPTIMISM]: `https://optimism.gateway.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_RPC_KEY}`,
  [CHAIN_ID.SEPOLIA]: ` https://sepolia.gateway.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_RPC_KEY}`,
  [CHAIN_ID.OPTIMISM_SEPOLIA]: `https://optimism-sepolia.gateway.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_RPC_KEY}`,
  [CHAIN_ID.BASE]: `https://base.gateway.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_RPC_KEY}`,
  [CHAIN_ID.BASE_SEPOLIA]: `https://base-sepolia.gateway.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_RPC_KEY}`,
  [CHAIN_ID.ZORA]: 'https://rpc.zora.energy',
  [CHAIN_ID.ZORA_SEPOLIA]: 'https://sepolia.rpc.zora.energy',
  [CHAIN_ID.FOUNDRY]: foundry.rpcUrls.default.http[0],
}

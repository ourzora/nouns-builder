import { foundry } from 'wagmi/chains'

import { CHAIN_ID } from 'src/typings'

export const RPC_URL: Record<number, string> = {
  [CHAIN_ID.ETHEREUM]: `https://mainnet.gateway.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_MAINNET_RPC_KEY}`,
  [CHAIN_ID.OPTIMISM]: `https://optimism.gateway.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_OPTIMISM_RPC_KEY}`,
  [CHAIN_ID.SEPOLIA]: `https://sepolia.gateway.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_SEPOLIA_RPC_KEY}`,
  [CHAIN_ID.BASE]: `https://base.gateway.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_BASE_RPC_KEY}`,
  [CHAIN_ID.ZORA]: `https://rpc-zora-mainnet-0.t.conduit.xyz/${process.env.NEXT_PUBLIC_ZORA_CONDUIT_RPC_KEY}`,
  [CHAIN_ID.FOUNDRY]: foundry.rpcUrls.default.http[0],
}

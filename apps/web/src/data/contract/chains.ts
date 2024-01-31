import { configureChains } from 'wagmi'
import {
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
  zora,
  zoraSepolia,
} from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import { PUBLIC_IS_TESTNET } from 'src/constants/defaultChains'
import { RPC_URL } from 'src/constants/rpc'
import { CHAIN_ID } from 'src/typings'

const MAINNET_CHAINS = [mainnet, zora, base, optimism]
// Mainnet is required here due to hooks like useEnsData that only pull data from mainnet
const TESTNET_CHAINS = [mainnet, sepolia, optimismSepolia, baseSepolia, zoraSepolia]

export const L1_CHAINS = PUBLIC_IS_TESTNET ? [CHAIN_ID.SEPOLIA] : [CHAIN_ID.ETHEREUM]

export const L2_CHAINS = PUBLIC_IS_TESTNET
  ? [CHAIN_ID.ZORA_SEPOLIA, CHAIN_ID.BASE_SEPOLIA, CHAIN_ID.OPTIMISM_SEPOLIA]
  : [CHAIN_ID.ZORA, CHAIN_ID.BASE, CHAIN_ID.OPTIMISM]

const AVAILIBLE_CHAINS = PUBLIC_IS_TESTNET ? TESTNET_CHAINS : MAINNET_CHAINS

const { chains, publicClient } = configureChains(
  [...AVAILIBLE_CHAINS],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string,
    }),
    jsonRpcProvider({
      rpc: (chain) => ({
        http: RPC_URL[chain.id as CHAIN_ID],
      }),
    }),
  ]
)

export { chains, publicClient }

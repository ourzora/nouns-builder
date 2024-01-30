import { configureChains } from 'wagmi'
import { baseGoerli, goerli, mainnet, optimism, optimismGoerli } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

import { PUBLIC_IS_TESTNET, base, zora, zoraGoerli } from 'src/constants/defaultChains'
import { RPC_URL } from 'src/constants/rpc'
import { CHAIN_ID } from 'src/typings'

const MAINNET_CHAINS = [mainnet, zora, base, optimism]
// Mainnet is required here due to hooks like useEnsData that only pull data from mainnet
const TESTNET_CHAINS = [mainnet, goerli, optimismGoerli, baseGoerli, zoraGoerli]

export const L1_CHAINS = PUBLIC_IS_TESTNET ? [CHAIN_ID.GOERLI] : [CHAIN_ID.ETHEREUM]

export const L2_CHAINS = PUBLIC_IS_TESTNET
  ? [CHAIN_ID.ZORA_GOERLI, CHAIN_ID.BASE_GOERLI, CHAIN_ID.OPTIMISM_GOERLI]
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

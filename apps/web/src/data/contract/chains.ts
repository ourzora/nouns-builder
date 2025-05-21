import { Transport, http } from 'viem'
import { fallback } from 'wagmi'

import { PUBLIC_ALL_CHAINS, PUBLIC_IS_TESTNET } from 'src/constants/defaultChains'
import { RPC_URL } from 'src/constants/rpc'
import { CHAIN_ID, Chain } from 'src/typings'

export const L1_CHAINS = PUBLIC_IS_TESTNET ? [CHAIN_ID.SEPOLIA] : [CHAIN_ID.ETHEREUM]

export const L2_CHAINS = PUBLIC_IS_TESTNET
  ? [CHAIN_ID.ZORA_SEPOLIA, CHAIN_ID.BASE_SEPOLIA, CHAIN_ID.OPTIMISM_SEPOLIA]
  : [CHAIN_ID.ZORA, CHAIN_ID.BASE, CHAIN_ID.OPTIMISM]

export const chains = PUBLIC_ALL_CHAINS

const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID
const ALCHEMY_ID = process.env.NEXT_PUBLIC_ALCHEMY_ID

type _transports = Record<CHAIN_ID, Transport>

const infuraNetworkName: Partial<Record<CHAIN_ID, string>> = {
  [CHAIN_ID.ETHEREUM]: 'mainnet',
  [CHAIN_ID.SEPOLIA]: 'sepolia',
  [CHAIN_ID.BASE]: 'base-mainnet',
  [CHAIN_ID.BASE_SEPOLIA]: 'base-sepolia',
  [CHAIN_ID.OPTIMISM]: 'optimism-mainnet',
  [CHAIN_ID.OPTIMISM_SEPOLIA]: 'optimism-sepolia',
}

const alchemyNetworkName: Partial<Record<CHAIN_ID, string>> = {
  [CHAIN_ID.ETHEREUM]: 'eth-mainnet',
  [CHAIN_ID.SEPOLIA]: 'eth-sepolia',
  [CHAIN_ID.OPTIMISM]: 'opt-mainnet',
  [CHAIN_ID.OPTIMISM_SEPOLIA]: 'opt-sepolia',
  [CHAIN_ID.BASE]: 'base-mainnet',
  [CHAIN_ID.BASE_SEPOLIA]: 'base-sepolia',
  [CHAIN_ID.ZORA]: 'zora-mainnet',
  [CHAIN_ID.ZORA_SEPOLIA]: 'zora-sepolia',
}

export const transports: _transports = chains.reduce((acc: _transports, chain: Chain) => {
  const list = [http()]

  const infuraNetwork = infuraNetworkName[chain.id]
  const infuraUrl =
    infuraNetwork && INFURA_ID
      ? `https://${infuraNetwork}.infura.io/v3/${INFURA_ID}`
      : undefined
  if (infuraUrl) list.push(http(infuraUrl))

  const alchemyNetwork = alchemyNetworkName[chain.id]
  const alchemyUrl =
    alchemyNetwork && ALCHEMY_ID
      ? `https://${alchemyNetwork}.g.alchemy.com/v2/${ALCHEMY_ID}`
      : undefined
  if (alchemyUrl) list.push(http(alchemyUrl))

  const defaultRPC = RPC_URL[chain.id]
  if (defaultRPC) list.push(http(defaultRPC))

  return {
    ...acc,
    [chain.id]: fallback(list.reverse()),
  }
}, {} as _transports)

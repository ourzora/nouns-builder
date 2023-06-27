import { goerli, mainnet, optimismGoerli } from 'wagmi/chains'

import { CHAIN_ID, Chain } from 'src/typings'

const MAINNET_CHAINS: Chain[] = [{ ...mainnet, id: CHAIN_ID.ETHEREUM, slug: 'eth' }]

const TESTNET_CHAINS: Chain[] = [
  { ...goerli, id: CHAIN_ID.GOERLI, slug: 'goerli' },
  { ...optimismGoerli, id: CHAIN_ID.OPTIMISM_GOERLI, slug: 'op-goerli' },
]

export const PUBLIC_ALL_CHAINS = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
}

export const PUBLIC_DEFAULT_CHAINS =
  process.env.NEXT_PUBLIC_NETWORK_TYPE === 'mainnet' ? MAINNET_CHAINS : TESTNET_CHAINS

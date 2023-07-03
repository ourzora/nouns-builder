import { baseGoerli, goerli, mainnet, optimismGoerli } from 'wagmi/chains'

import { CHAIN_ID, Chain } from 'src/typings'

const MAINNET_CHAINS: Chain[] = [
  { ...mainnet, id: CHAIN_ID.ETHEREUM, slug: 'eth', icon: '/chains/ethereum.svg' },
]

const TESTNET_CHAINS: Chain[] = [
  { ...goerli, id: CHAIN_ID.GOERLI, slug: 'goerli', icon: '/chains/ethereum.svg' },
  {
    ...optimismGoerli,
    id: CHAIN_ID.OPTIMISM_GOERLI,
    slug: 'op-goerli',
    icon: '/chains/optimism.svg',
  },
  {
    ...baseGoerli,
    id: CHAIN_ID.BASE_GOERLI,
    slug: 'base-goerli',
    icon: '/chains/base.svg',
  },
]

export const PUBLIC_ALL_CHAINS = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
}

export const PUBLIC_DEFAULT_CHAINS =
  process.env.NEXT_PUBLIC_NETWORK_TYPE === 'mainnet' ? MAINNET_CHAINS : TESTNET_CHAINS

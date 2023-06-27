import { create } from 'zustand'

import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { Chain } from 'src/typings'

export interface ChainStoreProps {
  chain: Chain
  setChain: (chain: Chain) => void
  chains: Chain[]
}

export const useChainStore = create<ChainStoreProps>((set) => ({
  chain: PUBLIC_DEFAULT_CHAINS[0],
  setChain: (chain) => set({ chain }),
  chains: PUBLIC_DEFAULT_CHAINS,
}))

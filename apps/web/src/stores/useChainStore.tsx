import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { PUBLIC_DEFAULT_CHAINS } from 'src/constants/defaultChains'
import { Chain } from 'src/typings'

export interface ChainStoreProps {
  chain: Chain
  setChain: (chain: Chain) => void
  chains: Chain[]
}

export const useChainStore = create(
  persist<ChainStoreProps>(
    (set) => ({
      chain: PUBLIC_DEFAULT_CHAINS[0],
      setChain: (chain) => set({ chain }),
      chains: PUBLIC_DEFAULT_CHAINS,
    }),
    {
      name: `nouns-builder-chain-${process.env.NEXT_PUBLIC_NETWORK_TYPE}`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)

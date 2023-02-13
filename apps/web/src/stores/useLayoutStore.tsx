import { Provider } from '@ethersproject/abstract-provider'
import { FetchSignerResult } from '@wagmi/core'
import create from 'zustand'

interface LayoutStoreProps {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
  signer: FetchSignerResult | undefined
  signerAddress: string | null
  setSignerAddress: (address: string) => void
  setSigner: (signer: FetchSignerResult | undefined) => void
  provider: Provider | undefined
  setProvider: (provider: Provider) => void
}

export const useLayoutStore = create<LayoutStoreProps>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
  signer: undefined,
  setSigner: (signer: FetchSignerResult | undefined) => set({ signer }),
  signerAddress: null,
  setSignerAddress: (signerAddress: string) => set({ signerAddress }),
  provider: undefined,
  setProvider: (provider: Provider) => set({ provider }),
}))

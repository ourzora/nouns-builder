import { create } from 'zustand'

interface LayoutStoreProps {
  isMobile: boolean
  setIsMobile: (isMobile: boolean) => void
}

export const useLayoutStore = create<LayoutStoreProps>((set) => ({
  isMobile: false,
  setIsMobile: (isMobile: boolean) => set({ isMobile }),
}))

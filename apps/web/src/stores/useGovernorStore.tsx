import { create } from 'zustand'

interface GovernorStoreProps {
  isQueueing: boolean
  setIsQueueing: (isQueueing: boolean) => void
}

export const useGovernorStore = create<GovernorStoreProps>((set) => ({
  isQueueing: false,
  setIsQueueing: (isQueueing: boolean) => set({ isQueueing }),
}))

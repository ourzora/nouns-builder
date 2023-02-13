import { DaoContractAddresses } from 'src/typings'
import create from 'zustand'

interface DaoStoreProps {
  addresses: DaoContractAddresses
  setAddresses: (addresses: DaoContractAddresses) => void
}

export const useDaoStore = create<DaoStoreProps>((set) => ({
  // should change this to a more specific name - daoContractAddresses
  addresses: {
    token: undefined,
    metadata: undefined,
    auction: undefined,
    treasury: undefined,
    governor: undefined,
  },
  setAddresses: (addresses: DaoContractAddresses) => set({ addresses }),
}))

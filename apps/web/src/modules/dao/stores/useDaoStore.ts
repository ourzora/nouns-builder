import { create } from 'zustand'

import { AddressType } from 'src/typings'

export interface DaoContractAddresses {
  token?: AddressType
  metadata?: AddressType
  auction?: AddressType
  treasury?: AddressType
  governor?: AddressType
  escrowDelegate?: AddressType
}

export interface DaoStoreProps {
  addresses: DaoContractAddresses
  setAddresses: (addresses: DaoContractAddresses) => void
}

export const useDaoStore = create<DaoStoreProps>((set) => ({
  addresses: {
    token: undefined,
    metadata: undefined,
    auction: undefined,
    treasury: undefined,
    governor: undefined,
    escrowDelegate: undefined,
  },
  setAddresses: (addresses: DaoContractAddresses) => set({ addresses }),
}))

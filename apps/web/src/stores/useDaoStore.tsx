import { DaoContractAddresses } from 'src/typings'
import { ethers } from 'ethers'
import { create } from 'zustand'

interface DaoStoreProps {
  addresses: DaoContractAddresses
  setAddresses: (addresses: DaoContractAddresses) => void
}

export const useDaoStore = create<DaoStoreProps>((set) => ({
  addresses: {
    token: ethers.constants.AddressZero,
    metadata: ethers.constants.AddressZero,
    auction: ethers.constants.AddressZero,
    treasury: ethers.constants.AddressZero,
    governor: ethers.constants.AddressZero,
  },
  setAddresses: (addresses: DaoContractAddresses) => set({ addresses }),
}))

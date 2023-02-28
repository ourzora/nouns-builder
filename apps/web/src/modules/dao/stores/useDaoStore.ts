import { DaoContractAddresses } from "../../../typings";
import { create } from "zustand";

interface DaoStoreProps {
  addresses: DaoContractAddresses;
  setAddresses: (addresses: DaoContractAddresses) => void;
}

export const useDaoStore = create<DaoStoreProps>((set) => ({
  addresses: {
    token: undefined,
    metadata: undefined,
    auction: undefined,
    treasury: undefined,
    governor: undefined
  },
  setAddresses: (addresses: DaoContractAddresses) => set({ addresses })
}));
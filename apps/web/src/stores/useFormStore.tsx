import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { PUBLIC_BUILDER_ADDRESS, PUBLIC_NOUNS_ADDRESS } from 'src/constants/addresses'
import {
  ArtworkFormValues,
  AuctionSettingsFormValues,
  GeneralFormValues,
} from 'src/modules/create-dao'
import {
  DaoContractAddresses,
  IPFSUpload,
  OrderedLayersProps,
  TokenAllocation,
} from 'src/typings'
import { yearsAhead } from 'src/utils/helpers'

export interface FormStoreState {
  activeSection: number
  setActiveSection: (activeSection: number) => void
  fulfilledSections: string[]
  setFulfilledSections: (section: string) => void
  general: GeneralFormValues
  setGeneral: (general: GeneralFormValues) => void
  vetoPower: boolean | undefined
  setVetoPower: (vetoPower: boolean) => void
  founderAllocation: Array<TokenAllocation>
  setFounderAllocation: (founderAllocation: Array<TokenAllocation>) => void
  contributionAllocation: Array<TokenAllocation>
  setContributionAllocation: (contributionAllocation: Array<TokenAllocation>) => void
  auctionSettings: AuctionSettingsFormValues
  setAuctionSettings: (auctionSettings: AuctionSettingsFormValues) => void
  setUpArtwork: ArtworkFormValues
  setSetUpArtwork: (artwork: ArtworkFormValues) => void
  ipfsUpload: IPFSUpload[]
  setIpfsUpload: (ipfsUpload: IPFSUpload[]) => void
  activeSectionCurrentIndex: number
  setActiveSectionCurrentIndex: (activeSectionCurrentIndex: number) => void
  deployedDao: DaoContractAddresses
  setDeployedDao: (deployedDao: DaoContractAddresses) => void
  orderedLayers: OrderedLayersProps[]
  setOrderedLayers: (orderedLayers: OrderedLayersProps[]) => void
  isUploadingToIPFS: boolean
  setIsUploadingToIPFS: (bool: boolean) => void
  nounsAllocationOn: boolean
  setNounsAllocationOn: (bool: boolean) => void
  resetForm: () => void
}

const initialState = {
  activeSection: 0,
  fulfilledSections: [],
  general: {
    daoAvatar: '',
    daoName: '',
    daoSymbol: '',
    daoWebsite: '',
  },
  auctionSettings: {
    auctionDuration: {
      seconds: undefined,
      days: undefined,
      hours: undefined,
      minutes: undefined,
    },
    auctionReservePrice: undefined,
    proposalThreshold: undefined,
    quorumThreshold: undefined,
  },
  founderAllocation: [],
  contributionAllocation: [
    {
      founderAddress: PUBLIC_BUILDER_ADDRESS,
      allocationPercentage: 1,
      endDate: yearsAhead(5),
    },
    {
      founderAddress: PUBLIC_NOUNS_ADDRESS,
      allocationPercentage: 1,
      endDate: yearsAhead(5),
    },
  ],
  nounsAllocationOn: true,
  vetoPower: undefined,
  setUpArtwork: {
    projectDescription: '',
    artwork: [],
    collectionName: '',
    externalUrl: '',
    filesLength: '',
  },
  ipfsUpload: [],
  orderedLayers: [],
  isUploadingToIPFS: false,
  activeSectionCurrentIndex: 0,
  deployedDao: {
    token: undefined,
    metadata: undefined,
    auction: undefined,
    treasury: undefined,
    governor: undefined,
  },
}

export const useFormStore = create(
  persist<FormStoreState>(
    (set) => ({
      ...initialState,
      setActiveSection: (activeSection) => set({ activeSection }),
      setFulfilledSections: (section: string) => {
        set((state) => ({
          fulfilledSections: !state.fulfilledSections.includes(section)
            ? [...state.fulfilledSections, section]
            : [...state.fulfilledSections],
        }))
      },
      setGeneral: (general: GeneralFormValues) => set({ general }),
      setAuctionSettings: (auctionSettings: AuctionSettingsFormValues) =>
        set({ auctionSettings }),
      setFounderAllocation: (founderAllocation: Array<TokenAllocation>) =>
        set({ founderAllocation }),
      setContributionAllocation: (contributionAllocation: Array<TokenAllocation>) =>
        set({ contributionAllocation }),
      nounsAllocationOn: true,
      setNounsAllocationOn: (nounsAllocationOn: boolean) => set({ nounsAllocationOn }),
      setVetoPower: (vetoPower: boolean) => set({ vetoPower }),
      setSetUpArtwork: (artwork: ArtworkFormValues) => set({ setUpArtwork: artwork }),
      setIpfsUpload: (ipfsUpload: IPFSUpload[]) => set({ ipfsUpload }),
      setOrderedLayers: (orderedLayers: OrderedLayersProps[]) => {
        set({
          orderedLayers,
        })
      },
      setIsUploadingToIPFS: (isUploadingToIPFS: boolean) => set({ isUploadingToIPFS }),
      setActiveSectionCurrentIndex: (activeSectionCurrentIndex: number) =>
        set({ activeSectionCurrentIndex }),
      setDeployedDao: (deployedDao: DaoContractAddresses) => {
        set({
          deployedDao,
        })
      },
      resetForm: () => set({ ...initialState }),
    }),
    {
      name: `nouns-builder-create-${process.env.NEXT_PUBLIC_CHAIN_ID}`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)

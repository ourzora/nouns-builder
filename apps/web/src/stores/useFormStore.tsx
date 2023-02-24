import {
  IPFSUpload,
  OrderedLayersProps,
  TokenAllocation,
  auctionSettingsProps,
  DaoContractAddresses,
  generalInfoProps,
  setUpArtworkProps,
  uploadArtworkErrorProps,
  votingSettingsProps,
} from 'src/typings'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { PUBLIC_BUILDER_ADDRESS, PUBLIC_NOUNS_ADDRESS } from 'src/constants/addresses'
import { yearsAhead } from 'src/utils/helpers'

export interface FormStoreState {
  activeSection: number
  setActiveSection: (activeSection: number) => void
  fulfilledSections: string[]
  setFulfilledSections: (section: string) => void
  generalInfo: generalInfoProps
  setGeneralInfo: (generalInfo: generalInfoProps) => void
  votingSettings: votingSettingsProps
  setVotingSettings: (votingSettings: votingSettingsProps) => void
  vetoPower: number | undefined
  setVetoPower: (vetoPower: number) => void
  founderAllocation: Array<TokenAllocation>
  setFounderAllocation: (founderAllocation: Array<TokenAllocation>) => void
  contributionAllocation: Array<TokenAllocation>
  setContributionAllocation: (contributionAllocation: Array<TokenAllocation>) => void
  auctionSettings: auctionSettingsProps
  setAuctionSettings: (auctionSettings: auctionSettingsProps) => void
  setUpArtwork: setUpArtworkProps
  setSetUpArtwork: (artwork: setUpArtworkProps) => void
  ipfsUpload: IPFSUpload[]
  setIpfsUpload: (ipfsUpload: IPFSUpload[]) => void
  artworkSettings: {}[]
  setArtworkSettings: (artworkSettings: {}[]) => void
  activeSectionCurrentIndex: number
  setActiveSectionCurrentIndex: (activeSectionCurrentIndex: number) => void
  deployedDao: DaoContractAddresses
  setDeployedDao: (deployedDao: DaoContractAddresses) => void
  orderedLayers: OrderedLayersProps[]
  setOrderedLayers: (orderedLayers: OrderedLayersProps[]) => void
  isUploadingToIPFS: boolean
  setIsUploadingToIPFS: (bool: boolean) => void
  uploadArtworkError: uploadArtworkErrorProps | null | undefined
  setUploadArtworkError: (uploadArtworkError: uploadArtworkErrorProps | null) => void
  nounsAllocationOn: boolean
  setNounsAllocationOn: (bool: boolean) => void
  resetForm: () => void
}

const initialState = {
  activeSection: 0,
  fulfilledSections: [],
  generalInfo: {
    daoAvatar: '',
    daoName: '',
    daoSymbol: '',
    daoWebsite: '',
  },
  votingSettings: {
    proposalThreshold: '',
    quorumThreshold: '',
  },
  auctionSettings: {
    maxTokenAllocation: '',
    allocationFrequency: '',
    auctionDuration: {
      seconds: '',
      days: '',
      hours: '',
      minutes: '',
    },
    auctionReservePrice: '',
    proposalThreshold: '',
    quorumThreshold: '',
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
    unitName: '',
    artwork: [],
    collectionName: '',
    externalUrl: '',
    filesLength: '',
  },
  ipfsUpload: [
    {
      name: '',
      webkitRelativePath: '',
      ipfs: null,
      trait: '',
    },
  ],
  artworkSettings: [],
  orderedLayers: [],
  isUploadingToIPFS: false,
  uploadArtworkError: undefined,
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
      setGeneralInfo: (generalInfo: generalInfoProps) => set({ generalInfo }),
      setVotingSettings: (votingSettings: votingSettingsProps) => set({ votingSettings }),
      setAuctionSettings: (auctionSettings: auctionSettingsProps) =>
        set({ auctionSettings }),
      setFounderAllocation: (founderAllocation: Array<TokenAllocation>) =>
        set({ founderAllocation }),
      setContributionAllocation: (contributionAllocation: Array<TokenAllocation>) =>
        set({ contributionAllocation }),

      nounsAllocationOn: true,
      setNounsAllocationOn: (nounsAllocationOn: boolean) => set({ nounsAllocationOn }),
      setVetoPower: (vetoPower: number) => set({ vetoPower }),
      setSetUpArtwork: (setUpArtwork: setUpArtworkProps) => set({ setUpArtwork }),
      setIpfsUpload: (ipfsUpload: IPFSUpload[]) => set({ ipfsUpload }),
      setArtworkSettings: (artworkSettings: {}[]) => {
        set({
          artworkSettings,
        })
      },
      setOrderedLayers: (orderedLayers: OrderedLayersProps[]) => {
        set({
          orderedLayers,
        })
      },
      setIsUploadingToIPFS: (isUploadingToIPFS: boolean) => set({ isUploadingToIPFS }),
      setUploadArtworkError: (uploadArtworkError: uploadArtworkErrorProps | null) =>
        set({ uploadArtworkError }),
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

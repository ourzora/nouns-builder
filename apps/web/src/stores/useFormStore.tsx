import {
  IPFSProps,
  OrderedLayersProps,
  allocationProps,
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
  founderAllocation: Array<allocationProps>
  setFounderAllocation: (founderAllocation: Array<allocationProps>) => void
  contributionAllocation: Array<allocationProps>
  setContributionAllocation: (contributionAllocation: Array<allocationProps>) => void
  auctionSettings: auctionSettingsProps
  setAuctionSettings: (auctionSettings: auctionSettingsProps) => void
  setUpArtwork: setUpArtworkProps
  setSetUpArtwork: (artwork: setUpArtworkProps) => void
  ipfsUpload: IPFSProps[]
  setIpfsUpload: (ipfsUpload: IPFSProps[]) => void
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
}

export const useFormStore = create(
  persist<FormStoreState>(
    (set) => ({
      /* generic form state */
      activeSection: 0,
      setActiveSection: (activeSection) => set({ activeSection }),
      fulfilledSections: [],
      setFulfilledSections: (section: string) => {
        set((state) => ({
          fulfilledSections: !state.fulfilledSections.includes(section)
            ? [...state.fulfilledSections, section]
            : [...state.fulfilledSections],
        }))
      },

      /* create dao state */
      generalInfo: {
        daoAvatar: '',
        daoName: '',
        daoSymbol: '',
        daoWebsite: '',
      },
      setGeneralInfo: (generalInfo: generalInfoProps) => set({ generalInfo }),

      /* voting settings state */
      votingSettings: {
        proposalThreshold: '',
        quorumThreshold: '',
      },
      setVotingSettings: (votingSettings: votingSettingsProps) => set({ votingSettings }),

      /* auction settings state */
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
      setAuctionSettings: (auctionSettings: auctionSettingsProps) =>
        set({ auctionSettings }),

      /* create dao state */
      // ////// FounderAllocationForm.tsx
      // array of allocation objects - signer and additional allocations if any
      founderAllocation: [],
      setFounderAllocation: (founderAllocation: Array<allocationProps>) =>
        set({ founderAllocation }),

      //////// ContributionAllocationForm.tsx
      // array of allocation objects - nouns or builder (either, neither, or both)
      // hardcoded default values
      contributionAllocation: [
        {
          // essential pieces of data
          founderAddress: PUBLIC_BUILDER_ADDRESS,
          allocation: '1',
          endDate: yearsAhead(5),
          // if a user doesn't toggle either contribution allocation
          // this persists to the end of the create flow
          // unimportant to the contract, the hardcoded values in
          // ContributionAllocationForm.tsx end up in the ui regardless
          maxAllocation: '',
        },
        {
          founderAddress: PUBLIC_NOUNS_ADDRESS,
          allocation: '1',
          endDate: yearsAhead(5),
          maxAllocation: '',
        },
      ],
      setContributionAllocation: (contributionAllocation: Array<allocationProps>) =>
        set({ contributionAllocation }),

      nounsAllocationOn: true,
      setNounsAllocationOn: (nounsAllocationOn: boolean) => set({ nounsAllocationOn }),

      vetoPower: undefined,
      setVetoPower: (vetoPower: number) => set({ vetoPower }),

      /* setUpArtwork state */
      setUpArtwork: {
        projectDescription: '',
        unitName: '',
        artwork: [],
        collectionName: '',
        externalUrl: '',
        filesLength: '',
      },
      setSetUpArtwork: (setUpArtwork: setUpArtworkProps) => set({ setUpArtwork }),

      /*  ipfs uploads  */
      ipfsUpload: [
        {
          name: '',
          webkitRelativePath: '',
          ipfs: null,
          trait: '',
        },
      ],
      setIpfsUpload: (ipfsUpload: IPFSProps[]) => set({ ipfsUpload }),

      /* artwork settings  */
      artworkSettings: [],
      setArtworkSettings: (artworkSettings: {}[]) => {
        set({
          artworkSettings,
        })
      },

      orderedLayers: [],
      setOrderedLayers: (orderedLayers: OrderedLayersProps[]) => {
        set({
          orderedLayers,
        })
      },

      isUploadingToIPFS: false,
      setIsUploadingToIPFS: (isUploadingToIPFS: boolean) => set({ isUploadingToIPFS }),

      /*  artwork errors */
      uploadArtworkError: undefined,
      setUploadArtworkError: (uploadArtworkError: uploadArtworkErrorProps | null) =>
        set({ uploadArtworkError }),

      /*  active sections formik instance */
      activeSectionCurrentIndex: 0,
      setActiveSectionCurrentIndex: (activeSectionCurrentIndex: number) =>
        set({ activeSectionCurrentIndex }),

      /* deployedDAO  */
      deployedDao: {
        token: undefined,
        metadata: undefined,
        auction: undefined,
        treasury: undefined,
        governor: undefined,
      },
      setDeployedDao: (deployedDao: DaoContractAddresses) => {
        set({
          deployedDao,
        })
      },
    }),
    {
      name: `nouns-builder-create-${process.env.NEXT_PUBLIC_CHAIN_ID}`,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    }
  )
)

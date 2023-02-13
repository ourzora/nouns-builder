import { ContractInterface } from 'ethers'
import { IPFSUploadResponse } from 'ipfs-service'
import { ReactElement } from 'react'
import {
  ProposalFragment,
  NounsProposalStatus as ProposalStatus,
  ProposalVoteFragment as ProposalVote,
  Support,
  MarketSortKey,
} from 'src/graphql/sdk'

export interface CreateFormSection {
  title: string
  heading?: string | string[]
  subHeading?: string | string[]
  forms: ReactElement[]
}

export interface generalInfoProps {
  daoAvatar: string
  daoName: string
  daoSymbol: string
  daoWebsite: string
}

export interface votingSettingsProps {
  proposalThreshold: number | string
  quorumThreshold: number | string
}

export interface auctionSettingsProps {
  auctionDuration: {
    seconds: number | string
    days: number | string
    hours: number | string
    minutes: number | string
  }
  auctionReservePrice: number | string
  proposalThreshold: number | string
  quorumThreshold: number | string
}

export interface allocationProps {
  allocation: string
  founderAddress: string
  endDate: string
  maxAllocation: string
}
export interface setUpArtworkProps {
  projectDescription: string
  collectionName: string
  artwork: { trait: string; properties: string[]; ipfs?: {}[] }[]
  externalUrl?: string
  filesLength: string | number
}
export interface IPFSProps {
  name: string
  webkitRelativePath: string
  ipfs: IPFSUploadResponse | null
  trait: string
  type?: string
  content?: File
  blob?: Blob | string
}

export interface OrderedLayersProps {
  trait: string
  properties: string[]
  ipfs?: {}[]
}

export interface uploadArtworkErrorProps {
  maxTraits?: string | null
  mime?: string | null
  directory?: string | null
  dimensions?: string | null
}

export interface DragAndDropProps {
  draggedFrom?: number
  draggedTo?: number | null
  isDragging?: boolean
  originalOrder?: {
    trait: string
    properties: string[]
    ipfs?: {}[]
  }[]
  updatedOrder?: {
    trait: string
    properties: string[]
    ipfs?: {}[]
  }[]
}

export interface ImageProps {
  cid?: string
  name: string
  trait: string
  uri: string
  url?: string
  path?: string
  content?: File
  blob?: Blob | string
}

export interface AddTransactionSection {
  title: string
  heading?: string | string[]
  subHeading?: string | string[]
  forms: ReactElement[]
}

export interface CustomTransactionProps {
  contract?: {
    address: string
    abi: ContractInterface
    fragments: readonly any[]
    functions: {}
  }
  address: string
  arguments?: any
  function: {
    name: string
    inputs: any[]
  }
  calldata?: string
  value: string
  customABI?: string
}

export interface ImagesByTraitProps {
  trait: string
  images: ImageProps[]
}

export interface PlaygroundProps {
  images: ImageProps[]
}

export interface SelectedTraitsProps {
  picker: string
  trait: string
  uri: string
  content: File
}

export interface TokenDataProps {
  id?: number
  name?: string | null
  image?: string | null
  owner?: string | null
  price?: string | null
  mintDate?: string | null
  description?: string | null
  highestBidder?: string | null
  media?: {
    original?: string
    thumbnail?: string
  }
}

export type { ProposalVote }
export interface Proposal extends Omit<ProposalFragment, 'executableFrom' | 'expiresAt'> {
  executableFrom?: number
  expiresAt?: number
  transactionInfo: {
    blockNumber: number
    transactionHash?: string | null
  }
  votes?: ProposalVote[]
}

export { Support }

export { ProposalStatus }

export type ProposalSucceededStatus = Extract<
  ProposalStatus,
  ProposalStatus.Succeeded | ProposalStatus.Queued | ProposalStatus.Executable
>

export const enum ProposalContractState {
  PENDING = 0,
  ACTIVE,
  CANCELLED,
  DEFEATED,
  SUCCEEDED,
  QUEUED,
  EXPIRED,
  EXECUTED,
}

export interface ExplorePageData {
  daos: {
    tokenId: string | null
    collectionName: string | null
    collectionAddress: string | null
    name: string | null
    image: string | null
    endTime: number | null
    highestBidder: string | null
    highestBidPrice: number | null
  }[]
  pageInfo: {
    limit: number
    hasNextPage: boolean
    endCursor?: string | null
  }
}

export { MarketSortKey }

export const enum NETWORK {
  GOERLI = 'GOERLI',
  MAINNET = 'MAINNET',
}

export type AddressType = `0x${string}`

export type BytesType = `0x${string}`

export interface DaoContractAddresses {
  token?: AddressType
  metadata?: AddressType
  auction?: AddressType
  treasury?: AddressType
  governor?: AddressType
}

import { GetContractResult } from '@wagmi/core'
import { ContractInterface } from 'ethers'
import { IPFSUploadResponse } from 'ipfs-service'
import { ReactElement } from 'react'
import {
  tokenAbi,
  metadataAbi,
  auctionAbi,
  treasuryAbi,
  governorAbi,
} from 'src/data/contract/abis'
import {
  ProposalFragment,
  NounsProposalStatus as ProposalStatus,
  ProposalVoteFragment as ProposalVote,
  Support,
  MarketSortKey,
  ImageMediaEncodingFragment,
} from 'src/data/graphql/sdk.generated'

export interface CreateFormSection {
  title: string
  heading?: string | string[]
  subHeading?: string | string[]
  forms: ReactElement[]
}

export interface Duration {
  seconds?: number
  days?: number
  hours?: number
  minutes?: number
}

export interface TokenAllocation {
  allocationPercentage: number | string
  founderAddress: string
  endDate: string
}

export interface IPFSUpload {
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

export interface Bid {
  id: number
  bidder: string
  amount: string
  transactionHash: string
}

export interface Token {
  id: string
  name?: string
  image?: string
  description?: string
  owner?: string
  media?: ImageMediaEncodingFragment
  mintDate?: string
}

export interface TokenWinner {
  highestBidder?: string
  price?: number
}

export interface TokenWithWinner extends Token, TokenWinner {}

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

export interface DaoContracts {
  tokenContract?: GetContractResult<typeof tokenAbi>
  metadataContract?: GetContractResult<typeof metadataAbi>
  auctionContract?: GetContractResult<typeof auctionAbi>
  treasuryContract?: GetContractResult<typeof treasuryAbi>
  governorContract?: GetContractResult<typeof governorAbi>
}

import { ContractInterface } from 'ethers'
import { IPFSUploadResponse } from 'ipfs-service'
import { ReactElement } from 'react'

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

export const enum NETWORK {
  GOERLI = 'GOERLI',
  MAINNET = 'MAINNET',
}

export type AddressType = `0x${string}`

export type BytesType = `0x${string}`

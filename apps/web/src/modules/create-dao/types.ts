import { IPFSUploadResponse } from 'ipfs-service'
import { ReactElement } from 'react'

export interface CreateFormSection {
  title: string
  heading?: string
  subHeading?: string
  form: ReactElement
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

export interface TokenAllocation {
  allocationPercentage: number | string
  founderAddress: string
  endDate: string
}

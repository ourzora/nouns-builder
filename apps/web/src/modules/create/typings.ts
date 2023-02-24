import { ReactElement } from "react";
import { IPFSUploadResponse } from "ipfs-service";

export interface CreateFormSection {
  title: string;
  heading?: string | string[];
  subHeading?: string | string[];
  forms: ReactElement[];
}

export interface generalInfoProps {
  daoAvatar: string;
  daoName: string;
  daoSymbol: string;
  daoWebsite: string;
}

export interface votingSettingsProps {
  proposalThreshold: number | string;
  quorumThreshold: number | string;
}

export interface AuctionDuration {
  seconds: number | string;
  days: number | string;
  hours: number | string;
  minutes: number | string;
}

export interface auctionSettingsProps {
  auctionDuration: AuctionDuration;
  auctionReservePrice: number | string;
  proposalThreshold: number | string;
  quorumThreshold: number | string;
}

export interface allocationProps {
  allocation: number | string;
  founderAddress: string;
  endDate: string;
}

export interface setUpArtworkProps {
  projectDescription: string;
  collectionName: string;
  artwork: { trait: string; properties: string[]; ipfs?: {}[] }[];
  externalUrl?: string;
  filesLength: string | number;
}

export interface IPFSUpload {
  name: string;
  webkitRelativePath: string;
  ipfs: IPFSUploadResponse | null;
  trait: string;
  type?: string;
  content?: File;
  blob?: Blob | string;
}

export interface OrderedLayersProps {
  trait: string;
  properties: string[];
  ipfs?: {}[];
}

export interface uploadArtworkErrorProps {
  maxTraits?: string | null;
  mime?: string | null;
  directory?: string | null;
  dimensions?: string | null;
}

export interface DragAndDropProps {
  draggedFrom?: number;
  draggedTo?: number | null;
  isDragging?: boolean;
  originalOrder?: {
    trait: string
    properties: string[]
    ipfs?: {}[]
  }[];
  updatedOrder?: {
    trait: string
    properties: string[]
    ipfs?: {}[]
  }[];
}

export interface ImageProps {
  cid?: string;
  name: string;
  trait: string;
  uri: string;
  url?: string;
  path?: string;
  content?: File;
  blob?: Blob | string;
}

export interface ImagesByTraitProps {
  trait: string;
  images: ImageProps[];
}

export interface SelectedTraitsProps {
  picker: string;
  trait: string;
  uri: string;
  content: File;
}
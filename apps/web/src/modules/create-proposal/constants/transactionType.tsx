import { color } from '@zoralabs/zord'

import { IconType } from 'src/components/Icon/icons'

export enum TransactionType {
  SEND_ETH = 'send-eth',
  AIRDROP = 'airdrop',
  DROPOSAL = 'droposal',
  CUSTOM = 'custom',
  UPGRADE = 'upgrade',
  PAUSE_AUCTIONS = 'pause-auctions',
}

export interface TransactionTypeProps {
  title: string
  subTitle: string
  icon: IconType
  iconBackdrop: string
  iconBorder?: boolean
}

export interface TransactionTypesPropsMap {
  [key: string]: TransactionTypeProps
}

export const TRANSACTION_TYPES = {
  [TransactionType.SEND_ETH]: {
    title: 'Send ETH',
    subTitle: 'Create a proposal to send ETH from the treasury',
    icon: 'eth',
    iconBackdrop: 'rgba(115, 17, 255, 0.1)',
  },
  [TransactionType.AIRDROP]: {
    title: 'Create an Airdrop',
    subTitle: 'Create a free Airdrop for selected addresses',
    icon: 'airdrop',
    iconBackdrop: 'rgba(28, 182, 135, 0.1)',
  },
  [TransactionType.DROPOSAL]: {
    title: 'Droposal: Single edition',
    subTitle: 'Create an NFT collection controlled by the DAO',
    icon: 'collection',
    iconBackdrop: 'rgba(137, 58, 199, 0.1);',
  },
  [TransactionType.UPGRADE]: {
    title: 'Upgrade Proposal',
    subTitle: 'Create a proposal to upgrade',
    icon: 'plus',
    iconBackdrop: color.ghostHover,
  },
  [TransactionType.PAUSE_AUCTIONS]: {
    title: 'Pause Auctions',
    subTitle: 'Create a proposal to pause auctions',
    icon: 'pauseTemplate',
    iconBackdrop: 'rgba(236, 113, 75, 0.1)',
  },
  [TransactionType.CUSTOM]: {
    title: 'Custom Transaction',
    subTitle: 'Create any other kind of transaction',
    icon: 'plus',
    iconBackdrop: color.ghostHover,
  },
} as TransactionTypesPropsMap

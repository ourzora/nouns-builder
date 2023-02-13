import { color } from '@zoralabs/zord'
import { IconType } from 'src/components/Icon/icons'

export enum TransactionType {
  SEND_ETH = 'SEND_ETH',
  AIRDROP = 'AIRDROP',
  CUSTOM = 'CUSTOM',
  UPGRADE = 'UPGRADE',
}

export interface TransactionSummaryProps {
  title: string
  subTitle: string
  icon: IconType
  iconBackdrop: string
  link: string
}

export interface TransactionTypesProps {
  [key: string]: TransactionSummaryProps
}

export const TRANSACTION_TYPE = {
  [TransactionType.SEND_ETH]: {
    title: 'Send ETH',
    subTitle: 'Create a proposal to send ETH from the treasury',
    icon: 'eth',
    iconBackdrop: 'rgba(115, 17, 255, 0.1)',
    link: 'sendeth',
  },
  [TransactionType.AIRDROP]: {
    title: 'Create an Airdrop',
    subTitle: 'Create a free Airdrop for selected addresses',
    icon: 'airdrop',
    iconBackdrop: 'rgba(28, 182, 135, 0.1)',
    link: 'airdrop',
  },
  [TransactionType.UPGRADE]: {
    title: 'Upgrade Proposal',
    subTitle: 'Create a proposal to upgrade',
    icon: 'plus',
    iconBackdrop: color.ghostHover,
    link: 'upgrade',
  },
  [TransactionType.CUSTOM]: {
    title: 'Custom Proposal',
    subTitle: 'Create any other kind of transaction',
    icon: 'plus',
    iconBackdrop: color.ghostHover,
    link: 'custom',
  },
} as TransactionTypesProps

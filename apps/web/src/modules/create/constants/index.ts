export interface CreateSectionsProps {
  [KEY: string]: {
    slug: string
    title: string
    subHeading?: string
  }
}

export type SectionProps =
  | 'general'
  | 'auction'
  | 'veto'
  | 'allocation'
  | 'artwork'
  | 'deploy'

export const CREATE_SECTION = {
  GENERAL: 'general' as SectionProps,
  AUCTION: 'auction' as SectionProps,
  VETO: 'veto' as SectionProps,
  ALLOCATION: 'allocation' as SectionProps,
  ARTWORK: 'artwork' as SectionProps,
  DEPLOY: 'deploy' as SectionProps,
}

export const CREATE_SECTIONS: CreateSectionsProps = {
  [CREATE_SECTION.GENERAL]: { slug: 'general', title: 'General' },
  [CREATE_SECTION.AUCTION]: { slug: 'auction', title: 'Auction' },
  [CREATE_SECTION.VETO]: {
    slug: 'veto',
    title: 'Veto',
    subHeading:
      'Veto power is useful for addressing security concerns in the early days of your DAO, though as your membership grows, consider revisiting this functionality through a decentralized community vote.',
  },
  [CREATE_SECTION.ALLOCATION]: { slug: 'allocation', title: 'Allocation' },
  [CREATE_SECTION.ARTWORK]: { slug: 'artwork', title: 'Artwork' },
  [CREATE_SECTION.DEPLOY]: {
    title: 'Deploy',
    slug: 'deploy',
    subHeading: '[Confirm your contract settings before deploying your DAO]',
  },
}
export const CREATE_FORM_ORDER = [
  CREATE_SECTION.GENERAL,
  CREATE_SECTION.AUCTION,
  CREATE_SECTION.VETO,
  CREATE_SECTION.ALLOCATION,
  CREATE_SECTION.ARTWORK,
  CREATE_SECTION.DEPLOY,
]

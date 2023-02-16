export interface CreateSectionProps {
  slug: string
  title: string
  subHeading?: string
}

export interface CreateSectionsProps {
  [KEY: string]: CreateSectionProps
}

export const CREATE_SECTION = {
  GENERAL: 'general',
  AUCTION: 'auction',
  VETO: 'veto',
  ALLOCATION: 'allocation',
  ARTWORK: 'artwork',
  DEPLOY: 'deploy',
}

export const CREATE_SECTIONS: CreateSectionsProps = {
  GENERAL: { slug: 'general', title: 'General' },
  AUCTION: { slug: 'auction', title: 'Auction' },
  VETO: {
    slug: 'veto',
    title: 'Veto',
    subHeading:
      'Veto power is useful for addressing security concerns in the early days of your DAO, though as your membership grows, consider revisiting this functionality through a decentralized community vote.',
  },
  ALLOCATION: { slug: 'allocation', title: 'Allocation' },
  ARTWORK: { slug: 'artwork', title: 'Artwork' },
  DEPLOY: {
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

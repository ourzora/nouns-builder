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

export const CREATE_FORM_ORDER = [
  CREATE_SECTION.GENERAL,
  CREATE_SECTION.AUCTION,
  CREATE_SECTION.VETO,
  CREATE_SECTION.ALLOCATION,
  CREATE_SECTION.ARTWORK,
  CREATE_SECTION.DEPLOY,
]

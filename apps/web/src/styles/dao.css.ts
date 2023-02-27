import { style, styleVariants } from '@vanilla-extract/css'

export const detailsWrapperStyle = style({
  maxWidth: 850,
})

export const collectorWrapperStyle = style({
  maxWidth: 1144,
  paddingLeft: 50,
  paddingRight: 50,
  '@media': {
    'screen and (max-width: 768px)': {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
})

export const treasuryWrapperStyle = style({
  maxWidth: 1170,
  paddingLeft: 50,
  paddingRight: 50,
  '@media': {
    'screen and (max-width: 768px)': {
      paddingLeft: 16,
      paddingRight: 16,
    },
  },
})

export const proposalWrapperStyle = style({
  maxWidth: 911,
})

export const adminWrapperStyle = style({
  maxWidth: 566,
})

export const sectionWrapperStyle = styleVariants({
  details: [detailsWrapperStyle],
  collectors: [collectorWrapperStyle],
  treasury: [treasuryWrapperStyle],
  proposals: [proposalWrapperStyle],
  admin: [adminWrapperStyle],
})

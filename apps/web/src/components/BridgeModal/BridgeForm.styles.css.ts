import { style } from '@vanilla-extract/css'
import { vars } from '@zoralabs/zord'

export const chainPopUpButton = style({
  backgroundColor: 'white',
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.background2,
    },
  },
})

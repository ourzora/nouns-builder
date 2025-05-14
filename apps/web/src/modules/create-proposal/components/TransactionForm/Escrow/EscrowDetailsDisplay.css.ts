import { style } from '@vanilla-extract/css'
import { color } from '@zoralabs/zord'

export const link = style({
  color: color.text1,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      color: color.text3,
    },
  },
})

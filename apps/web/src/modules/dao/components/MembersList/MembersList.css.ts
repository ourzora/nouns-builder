import { style } from '@vanilla-extract/css'

export const row = style({
  width: '100%',
})

export const rowItem = style({
  width: '20%',
  '@media': {
    'screen and (max-width: 768px)': {
      width: '30%',
    },
  },
})
export const firstRowItem = style({
  width: '37%',
})
export const lastRowItem = style({
  width: '23%',
  '@media': {
    'screen and (max-width: 768px)': {
      width: '40%',
    },
  },
})

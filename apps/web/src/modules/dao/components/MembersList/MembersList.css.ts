import { keyframes, style } from '@vanilla-extract/css'

const pulse = keyframes({
  '0%': { opacity: '1' },
  '100%': { opacity: '1' },
  '50%': { opacity: '.5' },
})

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
export const cardSkeleton = style({
  width: '100%',
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  height: '32px',
  '@media': {
    'screen and (max-width: 768px)': {
      height: '67px',
    },
  },
})

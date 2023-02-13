import { style } from '@vanilla-extract/css'

export const collectorsGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: '0.5rem',
  padding: '0 3rem',
  '@media': {
    'screen and (max-width: 1024px)': {
      padding: '0 2rem',
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    'screen and (max-width: 768px)': {
      padding: '0 1rem',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
})

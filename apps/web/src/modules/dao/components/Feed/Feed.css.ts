import { style } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'

export const feed = style([
  atoms({
    m: 'auto',
  }),
  {
    maxWidth: 912,
  },
])

export const feedLayoutWrapper = style({
  maxHeight: '500px',
  overflowY: 'auto',
  gridGap: '0.5rem',
  '@media': {
    'screen and (max-width: 1080px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
    'screen and (max-width: 768px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
})

export const castCardStyle = style({})

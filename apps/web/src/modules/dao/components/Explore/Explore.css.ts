import { keyframes, style } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'

const pulse = keyframes({
  '0%': { opacity: '1' },
  '100%': { opacity: '1' },
  '50%': { opacity: '.5' },
})

export const exploreSkeleton = style({
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  minHeight: '280px',
})

export const exploreGrid = style([
  atoms({
    gap: 'x4',
    w: '100%',
  }),
  {
    maxWidth: 912,
    '@media': {
      'screen and (min-width: 1024px)': {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr));',
      },
      'screen and (min-width: 600px) and (max-width: 1023px)': {
        maxWidth: 660,
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr));',
      },
      'screen and (max-width: 600px)': {
        gridTemplateColumns: 'repeat(1, minmax(0, 1fr))',
      },
    },
  },
])

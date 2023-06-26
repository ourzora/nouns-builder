import { keyframes, style } from '@vanilla-extract/css'
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
  height: '500px',
  overflowY: 'auto',
})

export const castCardStyle = style({})

const pulse = keyframes({
  '0%': { opacity: '1' },
  '100%': { opacity: '1' },
  '50%': { opacity: '.5' },
})

export const cardSkeleton = style({
  animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
  //   marginBottom: '2rem',
})

// requires !important to override default link styles from Zord
export const cardLink = style({
  textDecoration: 'none !important',
  color: 'inherit',
  backgroundImage: 'none !important',
  // won't let me override this without ts-ignore
  // @ts-ignore
  whiteSpace: 'normal !important',
  marginRight: '0 !important',
  ':after': {
    content: '"" !important',
  },
})

export const cardWrapper = style({
  transition: 'all 0.15s ease-in-out',
  selectors: {
    '&:hover': {
      backgroundColor: '#fafafa',
      cursor: 'pointer',
    },
  },
})

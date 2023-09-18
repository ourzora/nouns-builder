import { style } from '@vanilla-extract/css'
import { atoms, theme } from '@zoralabs/zord'

import { skeletonAnimation } from 'src/styles/animations.css'

export const bidInput = style([
  {
    width: '100%',
    border: 'none',
    borderRadius: '12px',
    height: '48px',
    paddingLeft: '16px',
    paddingRight: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: '.3s',
    selectors: {
      '&::placeholder': {
        color: theme.colors.tertiary,
      },
    },
  },
  atoms({
    backgroundColor: 'background2',
    fontSize: 14,
    lineHeight: 24,
  }),
])

export const feed = style([
  atoms({
    m: 'auto',
  }),
  {
    maxWidth: 912,
  },
])

export const auctionCardSkeleton = style({
  animation: skeletonAnimation,
  height: '96px',
})

export const daoCardSkeleton = style({
  animation: skeletonAnimation,
  height: '52px',
  width: '175px',
})

export const proposalCardSkeleton = style({
  animation: skeletonAnimation,
  height: '88px',
})

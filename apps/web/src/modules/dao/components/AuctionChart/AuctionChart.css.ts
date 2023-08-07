import { style } from '@vanilla-extract/css'

import { skeletonAnimation } from 'src/styles/animations.css'

export const activeFilter = style({
  borderBottom: '2px solid black',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
})
export const inactiveFilter = style({
  borderBottom: '2px solid transparent',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
})
export const chartSkeleton = style({
  animation: skeletonAnimation,
  height: '350px',
  maxWidth: '912px',
  '@media': {
    'screen and (max-width: 768px)': {
      height: '145px',
    },
  },
})

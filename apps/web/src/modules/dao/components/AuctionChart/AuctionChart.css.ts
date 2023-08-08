import { style } from '@vanilla-extract/css'

import { skeletonAnimation } from 'src/styles/animations.css'

export const selectedTab = style({
  borderBottom: '2px solid black',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
  textTransform: 'capitalize',
})
export const unselectedTab = style({
  borderBottom: '2px solid transparent',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
  textTransform: 'capitalize',
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
export const outerBox = style({
  height: '464px',
  maxWidth: '912px',
  '@media': {
    'screen and (max-width: 768px)': {
      height: 'fit-content',
    },
  },
})

export const viewBox = style({
  height: '100%',
  maxWidth: '912px',
})
export const innerBox = style({
  height: '90%',
})
export const displayPanelBox = style({
  height: '300px',
  maxWidth: '912px',
})

export const graphOnLoadStyles = style({
  opacity: '0',
  strokeDasharray: '1000 1000', // Some large number to initially hide the line
  strokeDashoffset: '1000', // Same large number to initially hide the line
})
export const svgBox = style({
  overflow: 'visible',
})
export const cursorText = style({
  fontSize: '20px',
  '@media': {
    'screen and (max-width: 768px)': {
      fontSize: '12px',
    },
  },
})

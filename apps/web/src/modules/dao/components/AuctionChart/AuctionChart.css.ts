import { style } from '@vanilla-extract/css'

import { skeletonAnimation } from 'src/styles/animations.css'

export const selectedTab = style({
  borderBottom: '2px solid black',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
  textTransform: 'capitalize',
  width: 'fit-content',
})
export const unselectedTab = style({
  borderBottom: '2px solid transparent',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
  textTransform: 'capitalize',
  width: 'fit-content',
})
export const chartSkeleton = style({
  animation: skeletonAnimation,
  height: '330px',
  maxWidth: '912px',
  '@media': {
    'screen and (max-width: 768px)': {
      height: '125px',
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
  width: '100%',
})
export const innerBox = style({
  height: '83%',
  width: '100%',
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
export const newTag = style({
  color: 'white',
  position: 'absolute',
  top: '0',
  right: '-30px',
  zIndex: 100,
  padding: '2px 5px',
})

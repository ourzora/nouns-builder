import { keyframes, style, styleVariants } from '@vanilla-extract/css'

import * as z from 'src/utils/layers'

export const animatedModal = style({
  position: 'fixed',
  background: 'rgba(0, 0, 0, 0.17)',
  height: '100vh',
  top: 0,
  left: 0,
  width: '100vw',
  zIndex: z.MODAL_BACKDROP_LAYER,
})

export const animatedModalTrigger = style({
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const uploadingSpinner = style({
  display: 'inline-block',
  selectors: {
    '&::after': {
      display: 'block',
      content: "' '",
      width: 20,
      height: 20,
      margin: 4,
      borderRadius: '50%',
      border: '3px solid #000',
      borderColor: '#000 #000 #000 transparent',
      animation: `${keyframes({
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      })} 1.5s linear infinite`,
    },
  },
})

export const defaultAnimatedModalContent = style({
  background: '#fff',
  maxWidth: 'calc(100vw - 50px)',
  height: 'auto',
  maxHeight: '90vh',
  zIndex: z.MODAL_CONTENT_LAYER,
  '@media': {
    'screen and (max-width: 768px)': {
      width: 'calc(100% - 50px)',
      left: 25,
      top: 25,
    },
  },
})

export const smallAnimatedContent = style({
  position: 'fixed',
  left: '50%',
  marginLeft: -448 / 2,
  width: 448,
  top: 120,
  gap: 24,
  padding: 32,
  borderRadius: 12,
  '@media': {
    'screen and (max-width: 768px)': {
      width: 'calc(100% - 50px)',
      left: 25,
      marginLeft: 0,
    },
  },
})

export const mediumAnimatedContent = style({
  position: 'fixed',
  left: '50%',
  marginLeft: -680 / 2,
  width: 680,
  top: 120,
  gap: 24,
  padding: 32,
  borderRadius: 12,
  '@media': {
    'screen and (max-width: 768px)': {
      width: 'calc(100% - 50px)',
      left: 25,
      marginLeft: 0,
    },
  },
})

export const largeAnimatedContent = style({
  position: 'fixed',
  left: '50%',
  marginLeft: -912 / 2,
  width: 912,
  top: 120,
  gap: 24,
  padding: 32,
  borderRadius: 12,
  '@media': {
    'screen and (max-width: 1000px)': {
      width: 'calc(100% - 50px)',
      left: 25,
      marginLeft: 0,
    },
    'screen and (max-width: 768px)': {
      width: 'calc(100% - 50px)',
      left: 25,
      marginLeft: 0,
    },
  },
})

export const animatedModalContent = styleVariants({
  small: [defaultAnimatedModalContent, smallAnimatedContent],
  medium: [defaultAnimatedModalContent, mediumAnimatedContent],
  large: [defaultAnimatedModalContent, largeAnimatedContent],
  auto: [
    defaultAnimatedModalContent,
    smallAnimatedContent,
    { marginLeft: -680 / 2, width: 680, height: 'auto' },
  ],
})

import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@zoralabs/zord'
import * as z from 'src/utils/layers'

export const modalBackdrop = style({
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  overflow: 'hidden',
  top: 0,
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  zIndex: z.MODAL_BACKDROP_LAYER,
})

export const modalCloseButtonStyle = style({
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const centeredModalWrapper = style({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: vars.color.background1,
  borderRadius: '24px',
  maxHeight: 'calc(100vh - 200px)',
  maxWidth: 1000,
  '@media': {
    'screen and (max-width: 768px)': {
      maxHeight: 'calc(100vh - 50px)',
    },
  },
})

export const navModalWrapper = style({
  width: '300px',
  border: '1px solid transparent',
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
  backgroundColor: vars.color.background1,
  borderRadius: '0.5rem',
  maxHeight: 'calc(100vh - 50px)',
  '@media': {
    'screen and (max-width: 768px)': {
      top: '5rem',
      left: 'calc(100% - 21rem)',
    },
  },
})

export const navMenuHead = style({
  paddingBottom: '0.3rem',
  borderBottom: '1px solid #e0e0e0',
})

export const disconnectButton = style({
  fontFamily: 'Inter, sans-serif!important',
  backgroundColor: 'white',
  color: 'red',
  marginLeft: '1rem',
  border: 'none',
})

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

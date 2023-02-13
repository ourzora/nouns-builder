import { atoms } from '../atoms'
import { MODAL_BACKDROP_LAYER } from '../constants/layers'
import { ease, media } from '../tokens'
import { keyframes, style } from '@vanilla-extract/css'

export const overlay = style([
  {
    background: 'rgba(0, 0, 0, 0.17)',
    inset: 0,
    placeItems: 'center',
    zIndex: MODAL_BACKDROP_LAYER,
  },
  atoms({ position: 'fixed', display: 'grid' }),
])

export const content = style([
  {
    backgroundColor: 'transparent',
    width: 'calc(100vw - 30px)',
    maxWidth: 470,
    zIndex: MODAL_BACKDROP_LAYER + 1,
    selectors: {
      '&:focus': {
        outline: 'none',
      },
    },
    '@media': {
      [media.min480]: {
        width: 470,
      },
    },
  },
  atoms({ position: 'fixed' }),
])

export const background = style([
  {
    maxHeight: 'calc(100vh - 30px)',
    animation: `0.3s ${ease.out} ${keyframes({
      '0%': { opacity: 0, transform: 'scale(0.95)' },
      '100%': { opacity: 1, transform: 'scale(1)' },
    })}`,
  },
  atoms({
    w: '100%',
    overflowY: 'auto',
  }),
])

export const padding = atoms({ padding: 'x6' })

export const close = style([
  {
    border: 'none',
    background: 'none',
  },
  atoms({
    position: 'absolute',
    top: 'x0',
    right: 'x0',
    p: 'x3',
    cursor: 'pointer',
  }),
])

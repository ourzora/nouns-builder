import { keyframes, style } from '@vanilla-extract/css'
import { atoms, color, vars } from '@zoralabs/zord'

import { NAV_BUTTON_ZINDEX } from 'src/constants/zIndex'
import * as z from 'src/utils/layers'

export const NavContainer = style([atoms({ m: 'auto', maxW: '100%' })])

export const NavWrapper = style([
  atoms({
    py: { '@initial': 'x3', '@768': 'x5' },
    px: 'x4',
    backgroundColor: 'background1',
    width: '100%',
    position: 'absolute',
  }),
  {
    height: '80px',
    zIndex: z.NAV_LAYER,
    backgroundColor: 'transparent',
  },
])

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

export const uploadNotificationWrapper = style({
  '@media': {
    '(max-width: 768px)': {
      background: '#fff',
      bottom: 0,
      paddingTop: 5,
      paddingBottom: 5,
    },
  },
})

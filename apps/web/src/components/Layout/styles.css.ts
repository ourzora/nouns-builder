import { keyframes, style } from '@vanilla-extract/css'
import { atoms, color, vars } from '@zoralabs/zord'

import { NAV_BUTTON_ZINDEX } from 'src/constants/zIndex'
import * as z from 'src/utils/layers'

export const NavContainer = style([
  atoms({ m: 'auto' }),
  {
    maxWidth: '1440px',
    selectors: {
      '&[data-create-page="true"]': {
        maxWidth: '100%',
      },
    },
  },
])

/*  /pages/create -- forms   */
export const NavWrapper = style([
  atoms({
    py: { '@initial': 'x3', '@768': 'x5' },
    px: 'x4',
    backgroundColor: 'background1',
  }),
  {
    height: '80px',
    zIndex: z.NAV_LAYER,
    selectors: {
      '&[data-create-page="true"]': {
        backgroundColor: 'transparent',
        position: 'absolute',
        width: '100%',
      },
    },
  },
])

export const navBorderBox = style([
  atoms({
    borderRadius: 'curved',
    borderColor: 'tertiary',
    borderWidth: 'normal',
    px: 'x4',
    ml: 'x4',
  }),
  {
    border: '2px solid #F2F2F2',
  },
])

export const networkButton = style([
  atoms({
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    p: 'x2',
    my: 'x1',
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: 'curved',
    cursor: 'pointer',
  }),
  {
    selectors: {
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
      '&:hover:disabled': {
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
      },
    },
  },
])

export const navButton = style({
  selectors: {
    '&[data-active="true"]': {
      zIndex: NAV_BUTTON_ZINDEX,
    },
  },
})

// to display over the navButton (Avatar) when that menu is open
export const activeNavAvatar = style([
  atoms({
    position: 'absolute',
    h: 'x10',
    w: 'x10',
    borderRadius: 'round',
  }),
  {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: NAV_BUTTON_ZINDEX + 1,
  },
])

export const connectButtonWrapper = style([
  {
    fontFamily: 'ptRoot, Arial, Helvetica, sans-serif !important',
    fontWeight: 400,
    zIndex: z.NAV_CONTENT_LAYER,
    width: '100%',
    selectors: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
])

export const navMenuItem = style({
  fontWeight: 700,
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const navMenuBurger = style([
  atoms({
    cursor: 'pointer',
    borderStyle: 'solid',
    borderColor: 'border',
    borderWidth: 'normal',
    borderRadius: 'round',
  }),
  {
    selectors: {
      '&:hover': {
        background: vars.color.ghostHover,
      },
    },
  },
])

export const overflowNavButton = style({
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const disconnectButton = style([
  atoms({
    cursor: 'pointer',
    py: 'x2',
    fontWeight: 'label',
    fontSize: 16,
    borderRadius: 'curved',
    borderColor: 'transparent',
  }),
  {
    backgroundColor: 'rgba(240, 50, 50, 0.1)',
    lineHeight: '24px',
    color: 'red',
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

export const uploadingSpinnerWhite = style({
  display: 'inline-block',
  selectors: {
    '&::after': {
      display: 'block',
      content: "' '",
      width: 20,
      height: 20,
      margin: 4,
      borderRadius: '50%',
      border: '3px solid #FFF',
      borderColor: '#FFF #FFF #FFF transparent',
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

export const mobileNav = style({
  width: 240,
  fontWeight: 700,
})

export const menuButtonLine = style([
  atoms({ backgroundColor: 'primary' }),
  {
    borderRadius: 12,
    display: 'block',
    height: 2,
    width: '1rem',
  },
])

export const menuButton = style({
  height: 32,
  backgroundColor: 'transparent',
  marginLeft: '0.5rem',
  selectors: {
    '&[data-toggled="true"]': {
      backgroundColor: 'initial',
    },
  },
})

export const mobileMenuWrapper = style({
  borderRadius: 12,
})

export const footerLink = style([
  atoms({
    textAlign: { '@initial': 'center', '@1024': 'left' },
  }),
  {
    fontSize: 16,
  },
])

export const footerWrapper = style([
  {
    borderTop: `2px solid ${color.border}`,
  },
])

export const footerContent = style({
  maxWidth: '90rem',
})

export const myDaosWrapper = style([
  atoms({
    overflowY: 'scroll',
    maxHeight: 'x64',
  }),
])

export const footerLogo = style({
  marginLeft: -2,
})

export const footerLogoTextLeft = style({
  textAlign: 'right',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
})

export const footerLogoTextRight = style({
  textAlign: 'left',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
})

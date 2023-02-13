import { atoms } from '../../atoms'
import { vars } from '../../theme'
import { keyframes, style } from '@vanilla-extract/css'

const slideDown = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' },
})

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 },
})

export const accordion = style({
  width: '100%',
})

export const accordionItem = style({
  overflow: 'hidden',
  marginTop: 1,
  selectors: {
    '&:first-child': {
      marginTop: 0,
      borderTopLeftRadius: 4,
      borderTopRightRadius: 4,
    },
    '&:last-child': {
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    '&:focus-within': {
      position: 'relative',
      zIndex: 1,
    },
  },
})

export const accordionHeader = style({
  all: 'unset',
  display: 'flex',
  width: '100%',
})

export const accordionDeselect = atoms({
  ml: 'auto',
})

export const accordionTrigger = style({
  all: 'unset',
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  justifyItems: 'center',
  height: 25,
  fontFamily: 'inherit',
  backgroundColor: 'transparent',
  paddingTop: vars.space.x3,
  gap: vars.space.x3,
  lineHeight: 1,
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const accordionContent = style({
  overflow: 'hidden',
  backgroundColor: vars.color.background1,
  selectors: {
    '&[data-state="open"]': {
      animation: `${slideDown} 200ms cubic-bezier(0.87, 0, 0.13, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${slideUp} 200ms cubic-bezier(0.87, 0, 0.13, 1)`,
    },
  },
})

export const accordionChevron = style({
  transition: 'transform 200ms cubic-bezier(0.87, 0, 0.13, 1)',
  selectors: {
    '[data-state=open] &': {
      transform: 'rotate(180deg)',
    },
  },
})

import { vars } from '../theme'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const checkboxBase = style({
  all: 'unset',
  color: vars.color.background1,
  width: vars.space.x3,
  minWidth: vars.space.x3,
  height: vars.space.x3,
  borderRadius: vars.radii.small,
  border: `2px solid ${vars.color.secondary}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.color.background1,
  selectors: {
    '&:hover': {
      borderColor: vars.color.neutral,
      backgroundColor: vars.color.background2,
    },
    '&[data-state="checked"]': {
      borderColor: vars.color.accent,
      backgroundColor: vars.color.accent,
      color: vars.color.onAccent,
    },
    '&[data-state="checked"]&:hover&:not([disabled])': {
      backgroundColor: vars.color.accentDisabled,
      borderColor: vars.color.accentDisabled,
      color: vars.color.onAccentDisabled,
      cursor: 'pointer',
    },
    '&:hover&[disabled]': {
      cursor: 'not-allowed',
      backgroundColor: vars.color.background1,
    },
    '&[data-state="checked"]&[disabled]': {
      borderColor: vars.color.accentDisabled,
      backgroundColor: vars.color.accentDisabled,
    },
  },
})

export const checkboxIndicator = style({
  color: vars.color.onAccent,
  width: vars.space.x4,
  height: vars.space.x4,
})

export const labelVariants = {
  label: {
    true: {
      padding: vars.space.x3,
    },
  },
  disabled: {
    true: {
      color: vars.color.tertiary,
      selectors: {
        '&:hover': {
          cursor: 'not-allowed',
          backgroundColor: 'inherit',
          color: vars.color.text4,
        },
      },
    },
  },
}

export const labelText = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: vars.space.x3,
    color: 'inherit',
    lineHeight: 1,
    padding: vars.space.x1,
    borderRadius: vars.space.x1,
    userSelect: 'none',
    transition: `all 0.1s ${vars.ease.out}`,
    selectors: {
      '&:hover': {
        cursor: 'pointer',
        color: vars.color.secondary,
      },
    },
  },
  variants: labelVariants,
})

export const svg = style({
  width: vars.space.x4,
  marginBottom: '2px',
  transform: 'scale(1.3)',
})

export const indeterminate = style({
  transform: 'translateY(0.5px)',
})

import { atoms } from '../atoms'
import { vars } from '../theme'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const tagVariants = {
  active: {
    true: [
      style({
        color: vars.color.onAccent,
        backgroundColor: vars.color.accent,
      }),
      atoms({
        borderRadius: 'normal',
      }),
    ],
  },
  inactive: {
    true: [
      style({
        color: vars.color.tertiary,
        backgroundColor: vars.color.background2,
      }),
      atoms({
        borderRadius: 'normal',
      }),
    ],
  },
  showDot: {
    true: [
      style({
        selectors: {
          '&:before': {
            content: '●',
            display: 'inline-block',
            marginRight: '3px',
            color: 'currentcolor',
          },
        },
      }),
    ],
  },
}

export const tag = recipe({
  variants: tagVariants,

  base: [
    style({
      fontWeight: vars.fontWeight.heading,
      letterSpacing: '0.05em',
      paddingTop: '2px',
      paddingBottom: '2px',
      fontSize: 11,
    }),
    atoms({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      h: 'x5',
      px: 'x2',
      textTransform: 'uppercase',
    }),
  ],

  defaultVariants: {
    active: true,
  },
})

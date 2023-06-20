import { globalStyle, style } from '@vanilla-extract/css'
import { atoms, vars } from '@zoralabs/zord'

export const propGuidelinesContainer = style([
  atoms({ m: 'auto' }),
  {
    maxWidth: '90rem',
  },
])

globalStyle(`${propGuidelinesContainer} a`, {
  textDecoration: 'underline',
  color: vars.color.accent,
})

globalStyle(`${propGuidelinesContainer} a:hover, a:active`, {
  color: vars.color.accentActive,
})

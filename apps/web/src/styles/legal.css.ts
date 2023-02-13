import { style, globalStyle } from '@vanilla-extract/css'
import { atoms, vars } from '@zoralabs/zord'

export const legalContainer = style([
  atoms({ m: 'auto' }),
  {
    maxWidth: '90rem',
  },
])

globalStyle(`${legalContainer} a`, {
  textDecoration: 'underline',
  color: vars.color.accent,
})

globalStyle(`${legalContainer} a:hover, a:active`, {
  color: vars.color.accentActive,
})

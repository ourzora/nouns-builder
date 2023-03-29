import { globalStyle, style } from '@vanilla-extract/css'

export const proposalDescription = style({})

globalStyle(`${proposalDescription} :is(h1, h2, h3, h4, h5, h6)`, {
  marginTop: 12,
  marginBottom: 6,
})

globalStyle(`${proposalDescription} p`, {
  marginBottom: 20,
})

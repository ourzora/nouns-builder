import { globalStyle, style } from '@vanilla-extract/css'

export const proposalDescription = style({})

globalStyle(`${proposalDescription} :is(h1, h2, h3, h4, h5, h6)`, {
  fontFamily: 'Londrina Solid!important',
  marginTop: 12,
  marginBottom: 6,
})

globalStyle(`${proposalDescription} > p`, {
  marginBottom: 20,
})

globalStyle(`${proposalDescription} code`, {
  backgroundColor: 'rgba(0, 0, 0, 0.17)',
  padding: '0.2em 0.4em',
  borderRadius: '6px',
  fontFamily: 'monospace!important',
})

globalStyle(`${proposalDescription} blockquote`, {
  color: '#808080',
  padding: '0 1em',
  borderLeft: '0.25em solid #808080',
  margin: 0,
  marginBottom: 20,
})

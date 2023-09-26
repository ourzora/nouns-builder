import { globalStyle, style } from '@vanilla-extract/css'

export const daoDescription = style({})

globalStyle(`${daoDescription} :is(h1, h2, h3, h4, h5, h6)`, {
  //   marginTop: 4,
})

globalStyle(`${daoDescription} :is(h1)`, {
  fontSize: '2.6rem',
  fontWeight: 700,
  borderBottom: '1px solid #f0f0f0',
  lineHeight: '1.6',
  marginBottom: 18,
})

globalStyle(`${daoDescription} :is(h2)`, {
  fontSize: '2rem',
  fontWeight: 700,
  borderBottom: '1px solid #f0f0f0',
  lineHeight: '1.4',
  marginBottom: 16,
})

globalStyle(`${daoDescription} :is(h3)`, {
  fontSize: '1.6rem',
  marginBottom: 14,
})

globalStyle(`${daoDescription} :is(h4)`, {
  fontSize: '1.3rem',
  fontWeight: 700,
  marginBottom: 12,
})

globalStyle(`${daoDescription} :is(h5)`, {
  fontSize: '1.1rem',
  fontWeight: 700,
  marginBottom: 12,
})

globalStyle(`${daoDescription} :is(h6)`, {
  fontSize: '0.9rem',
  fontWeight: 700,
  marginBottom: 12,
})

globalStyle(`${daoDescription} :is(p, li)`, {
  marginBottom: 8,
})
globalStyle(`${daoDescription} :is(a)`, {
  textDecoration: 'underline',
})

globalStyle(`${daoDescription} > p`, {
  marginBottom: 20,
})

globalStyle(`${daoDescription} code`, {
  backgroundColor: 'rgba(0, 0, 0, 0.08)',
  padding: '0.2em 0.4em',
  borderRadius: '6px',
  fontFamily: 'monospace!important',
})

globalStyle(`${daoDescription} blockquote`, {
  color: '#808080',
  padding: '0 1em',
  borderLeft: '0.25em solid #808080',
  margin: 0,
  marginBottom: 20,
})

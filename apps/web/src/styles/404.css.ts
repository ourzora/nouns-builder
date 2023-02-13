import { style } from '@vanilla-extract/css'

export const notFoundWrap = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 80px)',
  width: '100%',
  textAlign: 'center',
})

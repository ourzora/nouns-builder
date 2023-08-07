import { style } from '@vanilla-extract/css'

export const activeFilter = style({
  borderBottom: '2px solid black',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
})
export const inactiveFilter = style({
  borderBottom: '2px solid transparent',
  borderBottomLeftRadius: '0px',
  borderBottomRightRadius: '0px',
})

import { style } from '@vanilla-extract/css'

export const adminStickySaveWrapper = style({
  borderTop: '2px solid #F2F2F2',
  background: '#fff',
  zIndex: 1,
  '@media': {
    '(max-width: 768px)': {
      paddingLeft: 20,
      paddingRight: 20,
    },
  },
})

export const adminStickySaveButton = style({
  display: 'flex',
  height: 64,
  width: 566,
  fontFamily: 'Inter, sans-serif!important',
  borderRadius: '12px',
  '@media': {
    '(max-width: 768px)': {
      width: '100%',
    },
  },
})

export const confirmFormWrapper = {
  width: 540,
  margin: '0 auto',
}

import { style } from '@vanilla-extract/css'

export const uploadNotificationWrapper = style({
  '@media': {
    '(max-width: 768px)': {
      background: '#fff',
      bottom: 0,
      paddingTop: 5,
      paddingBottom: 5,
    },
  },
})

import { style } from '@vanilla-extract/css'
import { atoms } from '@zoralabs/zord'

export const feed = style([
  atoms({
    m: 'auto',
  }),
  {
    maxWidth: 912,
  },
])

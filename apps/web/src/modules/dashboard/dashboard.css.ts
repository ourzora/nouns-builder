import { style } from '@vanilla-extract/css'
import { atoms, theme } from '@zoralabs/zord'

export const bidInput = style([
  {
    width: '100%',
    maxWidth: '150px',
    border: 'none',
    borderRadius: '12px',
    height: '48px',
    paddingLeft: '16px',
    paddingRight: '16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: '.3s',
    selectors: {
      '&::placeholder': {
        color: theme.colors.tertiary,
      },
    },
  },
  atoms({
    backgroundColor: 'background2',
    fontSize: 16,
    lineHeight: 24,
  }),
])

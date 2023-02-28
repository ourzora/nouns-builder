import { keyframes, style } from '@vanilla-extract/css'

export const defaultUploadStyle = style({
  display: 'none',
})

export const uploadErrorBox = style({
  color: '#ff0015',
  boxSizing: 'border-box',
})

export const uploadingSpinner = style({
  display: 'inline-block',
  selectors: {
    '&::after': {
      display: 'block',
      content: "' '",
      width: 20,
      height: 20,
      margin: 4,
      borderRadius: '50%',
      border: '3px solid #000',
      borderColor: '#000 #000 #000 transparent',
      animation: `${keyframes({
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(360deg)' },
      })} 1.5s linear infinite`,
    },
  },
})

export const singleImageUploadWrapper = style({
  height: 160,
  width: 160,
  borderRadius: 80,
  background: '#F2F2F2',
  overflow: 'hidden',
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

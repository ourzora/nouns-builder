import { style, styleVariants } from '@vanilla-extract/css'
import { atoms, media, theme, themeClass, vars } from '@zoralabs/zord'

export const auctionWrap = atoms({
  flexDirection: 'column',
  width: '100%',
  justifyContent: { '@initial': 'flex-start', '@768': 'center' },
  mb: {
    '@initial': 'x9',
    '@768': 'x0',
  },
})

export const auctionWrapVariants = styleVariants({
  pre: [
    auctionWrap,
    atoms({
      pt: { '@initial': 'x16', '@768': 'x30' },
      pb: { '@initial': 'x20', '@768': 'x30' },
    }),
  ],
  post: [
    auctionWrap,
    {
      '@media': {
        [media.min768]: {
          minHeight: 482,
          maxHeight: 1000,
          height: '85vh',
        },
      },
    },
  ],
})

export const auctionGrid = style([
  atoms({
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: { '@initial': 'x0', '@768': 'x8' },
  }),
  {
    maxWidth: 912,
    gridTemplateColumns: 'repeat(1, 1fr)',
    '@media': {
      [media.min768]: {
        gridTemplateColumns: '464px 1fr',
      },
    },
  },
])

export const auctionHeaderDetails = style({
  boxSizing: 'border-box',
  borderBottom: '2px solid #F2F2F2',
  marginTop: 60,
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
})

export const auctionText = style({
  whiteSpace: 'nowrap',
})

export const auctionTextVariants = styleVariants({
  primary: [
    auctionText,
    {
      whiteSpace: 'normal',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: 28,
      lineHeight: '32px',
      fontWeight: 700,
      wordBreak: 'break-word',
      '@media': {
        [media.min768]: {
          fontSize: 36,
          lineHeight: '42px',
        },
      },
    },
  ],
  secondary: [
    auctionText,
    {
      fontWeight: 700,
      fontSize: 20,
      lineHeight: '32px',
      whiteSpace: 'nowrap',
      '@media': {
        [media.min768]: {
          fontSize: 24,
        },
      },
    },
  ],
  tertiary: [
    auctionText,
    {
      fontWeight: 400,
      fontSize: '1rem',
      whiteSpace: 'nowrap',
      color: 'rgba(0, 0, 0, 0.39)',
    },
  ],

  primaryHome: [
    auctionText,
    {
      fontFamily: "'Londrina Solid', cursive!important",
      whiteSpace: 'initial',
      fontWeight: 400,
      fontSize: '2rem',
      '@media': {
        '(min-width: 768px)': {
          fontSize: '3.5rem',
        },
      },
      selectors: {
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
  ],
})

export const auctionHeaderDetailsInfo = style({
  gap: '3rem',
  '@media': {
    'screen and (max-width: 768px)': {
      gap: '0.5rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      marginTop: 20,
    },
  },
})

export const auctionHeaderName = style({
  fontSize: 16,
  fontWeight: 700,
})

export const auctionHeaderValue = style({
  fontWeight: 300,
  color: '#808080',
  fontSize: 16,
})

export const auctionHeaderShareLogo = style({
  background: '#F1F1F1',
  borderRadius: 20,
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const auctionDateNavButton = style({
  height: 36,
  minWidth: 36,
  borderRadius: '18px',
  border: `2px solid ${vars.color.border}`,
  selectors: {
    '&:hover': {
      background: vars.color.border,
    },
  },
})

export const titleLink = style({
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const auctionImageWrapperStyle = style({
  height: 409,
  width: 409,
  overflow: 'hidden',
})

export const auctionWrapper = style({
  width: '100%',
  '@media': {
    '(max-width: 768px)': {
      padding: '0 0rem',
    },
  },
})

export const auctionInfoItem = style({
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: 'inherit',
  selectors: {
    '&:first-child': {
      '@media': {
        '(max-width: 768px)': {
          borderRight: 'none',
          paddingRight: '0rem',
        },
      },
    },
  },
})

export const auctionActionButton = style({
  fontSize: 18,
  lineHeight: '24px',
  borderRadius: '12px',
  height: 56,
})

export const auctionActionButtonVariants = styleVariants({
  bid: [auctionActionButton],
  bidding: [
    auctionActionButton,
    { width: '100%', background: '#F1F1F1', color: '#B3B3B3' },
  ],
  settle: [auctionActionButton, { width: '100%' }],
  settling: [
    auctionActionButton,
    { width: '100%', background: '#F1F1F1', color: '#808080' },
  ],
})

export const placeBidModalInner = style({
  width: '50%',
  margin: '0 auto',
})

export const bidForm = style({
  width: '100%',
})

export const bidInput = style([
  {
    width: '100%',
    border: 'none',
    borderRadius: '12px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: '.3s',
    paddingLeft: 16,
    paddingRight: 16,
    selectors: {
      '&::placeholder': {
        color: theme.colors.tertiary,
      },
    },
  },
  atoms({
    backgroundColor: 'background2',
    p: 'x4',
    fontSize: 16,
    lineHeight: 24,
  }),
])

export const allBidsButton = style({
  width: '100%',
  justifyContent: 'center',
  borderTop: '2px solid #F2F2F2',
  cursor: 'pointer',
})

export const allBidsWrapper = style({
  // calc 4rem off of the sides of the screen
  width: 'calc(100vw - 4rem)',
})

export const viewAllBidsWrapper = style({
  position: 'relative',
  opacity: 0,
  height: 0,
  '@media': {
    '(min-width: 768px)': {
      height: 'initial',
      opacity: 1,
    },
  },
  selectors: {
    '&::before': {
      content: '',
      display: 'block',
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: vars.color.background2,
      height: 2,
    },
  },
})

export const auctionImg = style([
  {
    '@media': {
      '(min-width: 768px)': {
        margin: 0,
        width: 450,
        borderRadius: 12,
      },
    },
  },
  atoms({
    display: 'block',
    width: '100vw',
    borderColor: 'border',
    borderWidth: 'thin',
    borderStyle: 'solid',
  }),
])

export const auctionInput = style({
  marginRight: 0,
  '@media': {
    '(min-width: 768px)': {
      marginRight: 8,
    },
  },
})

export const recentBid = style({
  maxWidth: 'calc(912px * .5)',
  selectors: {
    '&:not(:first-of-type)': {
      display: 'none',
    },
    '&:last-of-type': {
      display: 'flex',
    },
  },
  '@media': {
    '(min-width: 768px)': {
      selectors: {
        '&:not(:first-of-type)': {
          display: 'flex',
        },
      },
    },
  },
})

export const recentBidder = style({
  fontWeight: 700,
})

export const allRecentBidsButton = style([
  atoms({
    borderRadius: 'phat',
    py: 'x2',
    px: 'x4',
    cursor: 'pointer',
  }),
  {
    backgroundColor: '#ffffff',
    border: '1px solid #f2f2f2',
    fontWeight: 800,
    transition: 'background-color 100ms',
    fontSize: 16,
    selectors: {
      '&:hover': {
        backgroundColor: '#f2f2f2',
      },
    },
  },
])

export const tokenImage = style({
  borderRadius: 12,
  overflow: 'hidden',
  '::after': {
    boxShadow: '0px 0px 0px 2px rgba(0, 0, 0, 0.04) inset',
    content: '',
    display: 'block',
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '100%',
    borderRadius: 12,
  },
})

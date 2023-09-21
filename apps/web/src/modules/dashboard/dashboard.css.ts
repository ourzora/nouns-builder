import { style } from '@vanilla-extract/css'
import { atoms, theme } from '@zoralabs/zord'

import { skeletonAnimation } from 'src/styles/animations.css'

export const outerAuctionCard = style([
  {
    marginBottom: '24px',
    width: '100%',
    alignItems: 'center',
    padding: '12px 24px',
    '@media': {
      'screen and (max-width: 768px)': {
        flexDirection: 'column',
        padding: '16px 8px',
        alignItems: 'flex-start',
        gap: '16px',
      },
    },
  },
  atoms({
    borderColor: 'border',
    borderStyle: 'solid',
    borderRadius: 'curved',
    borderWidth: 'normal',
  }),
])

export const daoTokenName = style([
  {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: '200px',
    '@media': {
      'screen and (max-width: 912px)': {
        width: '150px',
      },
      'screen and (max-width:768px)': {
        width: '220px',
      },
    },
  },
  atoms({
    fontWeight: 'label',
    fontSize: 20,
  }),
])

export const daoAvatar = style({
  objectFit: 'contain',
  borderRadius: '16px',
  height: 64,
  width: 64,
})
export const daoAvatarBox = style({
  marginRight: '24px',
  width: '64px',
})

export const auctionCardBrand = style({
  alignItems: 'center',
  width: '40%',
  cursor: 'pointer',
  '@media': {
    'screen and (max-width: 912px)': {
      width: '35%',
    },
    'screen and (max-width: 768px)': {
      width: '100%',
    },
  },
})

export const stats = style({
  width: '50%',
})
export const statsBox = style({
  width: '30%',
  '@media': {
    'screen and (max-width: 768px)': {
      width: '80%',
    },
    'screen and (max-width: 484px)': {
      width: '100%',
    },
  },
})

export const bidBox = style({
  marginLeft: 'auto',
  width: '250px',
  '@media': {
    'screen and (max-width: 768px)': {
      width: '100%',
      marginLeft: 0,
    },
  },
})

export const bidForm = style({
  width: '75%',
})

export const bidButton = style({
  width: '25%',
})
export const bidInput = style([
  {
    width: '100%',
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
    fontSize: 14,
    lineHeight: 24,
  }),
])

export const feed = style([
  atoms({
    m: 'auto',
  }),
  {
    maxWidth: 912,
  },
])

export const auctionCardSkeleton = style({
  animation: skeletonAnimation,
  height: '96px',
})

export const daoCardSkeleton = style({
  animation: skeletonAnimation,
  height: '52px',
  width: '175px',
})

export const proposalCardSkeleton = style({
  animation: skeletonAnimation,
  height: '88px',
})
export const minButton = style({
  minWidth: 'fit-content',
  fontWeight: 500,
  paddingLeft: 0,
  paddingRight: 0,
  top: 0,
  right: 0,
  bottom: 0,
})
export const daoName = style({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '250px',
  '@media': {
    'screen and (max-width: 484px)': {
      maxWidth: '200px',
    },
  },
})

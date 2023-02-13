import { style } from '@vanilla-extract/css'

export const treasuryCard = style({
  flexDirection: 'row',
  padding: '1rem',
  '@media': {
    'screen and (max-width: 768px)': {
      padding: '0.5rem',
      flexDirection: 'column',
    },
  },
})

export const treasuryCardBalancesWrapper = style({
  padding: '1rem',
  width: '100%',
  flexDirection: 'column',
  // justifyContent: 'space-around',
  '@media': {
    'screen and (max-width: 1024px)': {
      justifyContent: 'flex-start',
      padding: '0.5rem',
    },
  },
})

export const balancesRow = style({
  flexDirection: 'row',
  height: '100%',
  '@media': {
    'screen and (max-width: 1024px)': {
      flexDirection: 'column',
    },
  },
})

export const ethTreasuryAmt = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'flex-end',
  fontFamily: "'Londrina Solid', cursive!important",
  fontSize: '2.5rem',
  padding: '0 1rem',
  borderRight: '2px solid #E6E6E6',
  '@media': {
    'screen and (max-width: 1024px)': {
      padding: '0 0.5rem',
      borderRight: '0px',
    },
  },
})

export const usdTreasuryAmt = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'flex-end',
  padding: '0 1rem',
  fontFamily: "'Londrina Solid', cursive!important",
  fontSize: '2.5rem',
  '@media': {
    'screen and (max-width: 1024px)': {
      padding: '0 0.5rem',
    },
  },
})

export const governanceInfo = style({
  padding: '1rem',
  width: ' 40%',
  borderLeft: '2px solid #E6E6E6',
  '@media': {
    'screen and (max-width: 1024px)': {
      padding: '0.5rem',
      width: '100%',
      borderLeft: '0px',
      borderTop: '0px solid #E6E6E6',
    },
    'screen and (max-width: 768px)': {
      borderTop: '2px solid #E6E6E6',
    },
  },
})

export const detailsSubHeadingStyle = style({
  color: '#8C8D92',
  fontSize: 24,
  lineHeight: '29px',
})

export const detailsDaoNameStyle = style({
  fontSize: 56,
  lineHeight: '66px',
  letterSpacing: '.02em',
  color: '#14161B',
  marginTop: 0,
  marginBottom: 10,
})

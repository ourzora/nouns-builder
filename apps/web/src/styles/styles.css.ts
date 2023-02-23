import { globalStyle, style, styleVariants } from '@vanilla-extract/css'

/*  Globals  */
globalStyle('*', {
  fontFamily: "'ptRoot', Arial, Helvetica, sans-serif!important",
})

globalStyle('h1, h2, h3, h4', {
  fontFamily: "'Londrina Solid', cursive!important",
  lineHeight: 'initial',
})

globalStyle('img', {
  maxWidth: '100%',
  height: 'auto',
})

/*    */
export const pageGrid = style({
  display: 'grid',
  minHeight: '100vh',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr',
  width: '100%',
  maxHeight: '100vh',
  overflow: 'hidden',
  '@media': {
    '(max-width: 768px)': {
      gridTemplateColumns: '1fr',
      minHeight: 'auto',
      overflow: 'initial',
    },
  },
})

/*  /pages/create -- forms   */
export const flowWrapper = style({
  display: 'flex',
  position: 'absolute',
  bottom: 84,
  left: '50%',
  margin: '0 auto',
  transform: 'translateX(-50%)',
  zIndex: 1,
  justifyContent: 'space-around',
  '@media': {
    '(max-width: 768px)': {
      display: 'none',
      position: 'relative',
      padding: 0,
      width: '100%',
      zIndex: 1,
      marginLeft: -0,
      left: 0,
      marginBottom: -184,
      paddingTop: 300,
    },
  },
})

export const flowMobileDropdownButton = style({
  display: 'flex',
  padding: 5,
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #F2F2F2',
  width: 'calc(100% - 50px)',
  margin: '0 auto',
  marginBottom: 30,
  borderRadius: 10,
  background: '#000',
  color: '#fff',
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const flowTitleFulfilled = style({
  color: '#1CB687',
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

const flowTitleBase = style({
  position: 'absolute',
  fontSize: 18,
  fontWeight: 700,
  color: '#FFF',
  top: 30,
  '@media': {
    '(max-width: 768px)': {
      display: 'none',
    },
    '(max-width: 1080px)': {
      fontSize: 16,
    },
  },
})

export const flowTitleVariant = styleVariants({
  active: [flowTitleBase, { opacity: 1 }],
  default: [flowTitleBase],
  fulfilled: [flowTitleBase, { opacity: 1 }],
  preview: [flowTitleBase, { color: '#DADADA' }],
  previewActive: [flowTitleBase, { color: '#000' }],
})

export const flowFulfilledCircle = style({
  backgroundColor: '#FFF',
  border: '2px solid #FFF',
  selectors: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const flowFulfilledCircleLast = style({
  backgroundColor: '#FFF',
  border: '2px solid #FFF',

  selectors: {
    '&:before': {
      content: 'none',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export const flowCircle = style({
  backgroundColor: 'rgba(255,255,255, 0)',
  border: '2px solid #FFF',
  '@media': {
    'screen and (max-width: 768px)': {
      backgroundColor: '#FFF',
      border: '2px solid #F2F2F2',
    },
  },
})

export const flowCircleLast = style({
  backgroundColor: 'rgba(255,255,255, 0)',
  border: '2px solid #FFF',
  '@media': {
    'screen and (max-width: 768px)': {
      backgroundColor: '#FFF',
      border: '2px solid #F2F2F2',
    },
  },
  selectors: {
    '&:before': {
      content: 'none',
    },
  },
})

export const flowCircleActive = style({
  backgroundColor: '#FFF',
  border: '2px solid #FFF',
  '@media': {
    'screen and (max-width: 768px)': {
      border: '2px solid #F2F2F2',
    },
  },
})

export const flowCircleActiveLast = style({
  backgroundColor: '#FFF',
  border: '2px solid #FFF',
  selectors: {
    '&:before': {
      content: 'none',
    },
  },
})

export const circleBase = style({
  position: 'relative',
  color: '#1CB687',
  borderRadius: '100%',
})

export const circleVariant = styleVariants({
  flowCircle: [circleBase, flowCircle],
  flowCircleLast: [circleBase, flowCircleLast],
  flowCircleActive: [circleBase, flowCircleActive],
  flowCircleActiveLast: [circleBase, flowCircleActiveLast],
  flowFulfilledCircle: [circleBase, flowFulfilledCircle],
  flowFulfilledCircleLast: [circleBase, flowFulfilledCircleLast],
  preview: [circleBase, { backgroundColor: '#DADADA' }],
  previewActive: [circleBase, { backgroundColor: '#000' }],
})

export const transactionCircleVariant = styleVariants({
  flowFulfilledCircle: [circleBase, flowFulfilledCircle, { background: '#000' }],
  flowFulfilledCircleLast: [circleBase, flowFulfilledCircleLast, { background: '#000' }],
  flowCircle: [circleBase, flowCircle, { background: '#F2F2F2' }],
  flowCircleLast: [circleBase, flowCircleLast, { background: '#F2F2F2' }],
  flowCircleActive: [circleBase, flowCircleActive, { background: '#000' }],
  flowCircleActiveLast: [circleBase, flowCircleActiveLast, { background: '#000' }],
})

export const flowSectionWrapper = style({
  marginRight: 85,
  selectors: {
    '&:last-of-type': {
      marginRight: 0,
    },
    '&:first-child&:before': {
      position: 'absolute',
      content: '',
      top: '50%',
      marginTop: -1,
      width: 516,
      border: '1px dashed #FFF',
      opacity: 0.7,
      '@media': {
        '(max-width: 1080px)': {
          width: 368,
        },
        '(max-width: 768px)': {
          display: 'none',
        },
      },
    },
  },
  '@media': {
    '(max-width: 1080px)': {
      marginRight: 55,
    },
  },
})

export const flowSectionWrapperVariants = styleVariants({
  default: [flowSectionWrapper],
  preview: [
    flowSectionWrapper,
    {
      selectors: {
        '&:first-child&:before': {
          position: 'absolute',
          content: '',
          top: '50%',
          marginTop: -1,
          width: 516,
          border: '1px dashed #B3B3B3',
          '@media': {
            '(max-width: 1080px)': {
              width: 368,
            },
            '(max-width: 768px)': {
              display: 'none',
            },
          },
        },
      },
    },
  ],
})

export const transactionFlowSectionWrapper = style({
  marginRight: 85,
  selectors: {
    '&:last-of-type': {
      marginRight: 0,
    },
    '&:first-child&:before': {
      position: 'absolute',
      content: '',
      top: '50%',
      marginTop: -1,
      width: 516,
      border: '1px dashed #F2F2F2',
      '@media': {
        '(max-width: 1080px)': {
          width: 368,
        },
        '(max-width: 768px)': {
          display: 'none',
        },
      },
    },
  },
  '@media': {
    '(max-width: 1080px)': {
      marginRight: 55,
    },
  },
})

/*  /pages/create -- Form   */

export const createWrapper = style({
  '@media': {
    '(max-width: 768px)': {
      flexDirection: 'column',
      marginTop: 40,
    },
  },
})

const createWrapperBase = style({
  position: 'relative',
  boxSizing: 'border-box',
  width: '100%',
  '@media': {
    '(max-width: 768px)': {
      padding: 25,
      paddingTop: 80,
    },
  },
})

export const createWrapperLeft = style({
  maxHeight: '100vh',
  background: "url('/bg.jpeg') no-repeat center center",

  backgroundSize: 'cover',
})

export const createWrapperRight = style({
  overflow: 'scroll',
  '@media': {
    '(max-width: 768px)': {
      overflow: 'initial',
    },
  },
})

export const createWrapperHalf = styleVariants({
  left: [createWrapperBase, createWrapperLeft],
  right: [createWrapperBase, createWrapperRight],
})

export const formWrapper = style({
  position: 'absolute',
  top: 0,
  padding: '150px 0',
  maxWidth: 528,
  width: '80%',
  '@media': {
    '(max-width: 1200px)': {
      maxWidth: 400,
    },
    '(max-width: 768px)': {
      position: 'relative',
      padding: 0,
      width: '100%',
    },
  },
})

export const preHeadingStyle = style({
  fontSize: 12,
  lineHeight: '20px',
  letterSpacing: '.05em',
  textTransform: 'uppercase',
})

export const headingStyle = style({
  fontSize: 40,
})

export const subHeadingStyle = style({
  color: '#4D4D4D',
})

export const artByStyle = style({
  opacity: 0.5,
})

export const artByLinkStyle = style({
  color: '#fff',
})

export const artByStyleWrapper = style({
  color: '#fff',
  fontSize: 18,
  fontFamily: 'ptBold',
  '@media': {
    '(max-width: 768px)': {
      left: 20,
      right: 0,
      top: 25,
    },
  },
})

/*  /pages/discourse -- discourse   */
export const auctionGrid = style({
  maxWidth: 1000,
  gridTemplateColumns: 'repeat(2, 1fr)',
  '@media': {
    '(max-width: 1080px)': {
      gridTemplateColumns: 'repeat(1, 1fr)',
    },
  },
})

export const auctionWrapper = style({
  height: '100%',
  width: '100%',
  padding: '0 2rem 0 2rem',
})

export const auctionHeader = style({
  fontFamily: 'Inter, sans-serif!important',
  fontWeight: 800,
  fontSize: '50px',
  marginTop: '1rem',
  marginBottom: '1rem',
})

export const auctionSecondaryText = style({
  fontFamily: 'Inter, sans-serif!important',
  fontWeight: 800,
  fontSize: '30px',
})

export const daoCardHeader = style({
  fontWeight: 500,
  fontSize: 18,
  whiteSpace: 'nowrap',
  // color: 'rgba(0, 0, 0, 0.39)',
})

export const daoCardName = style({
  whiteSpace: 'nowrap',
})

export const truncateLine = style({
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '@media': {
    'screen and (max-width: 1024px)': {
      maxWidth: 260,
    },
    'screen and (max-width: 768px)': {
      maxWidth: 200,
    },
  },
})

export const borderTop = style({
  borderTop: 'solid 2px',
  borderColor: '#F2F2F2',
})

export const borderBottom = style({
  borderBottom: 'solid 2px',
  borderColor: '#F2F2F2',
})

export const borderRight = style({
  borderRight: 'solid 2px',
  borderColor: '#F2F2F2',
})

export const borderAll = style({
  border: '2px solid #F2F2F2',
})

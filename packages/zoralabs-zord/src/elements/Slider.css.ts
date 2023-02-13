import { atoms } from '../atoms'
import { vars } from '../theme'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'

export const eyebrowVariants = {
  disabled: {
    true: {
      cursor: 'not-allowed',
      color: vars.color.secondary,
    },
  },
  offsetRight: {
    true: {
      marginRight: vars.space.x4,
    },
  },
  offsetLeft: {
    true: {
      marginLeft: vars.space.x4,
    },
  },
}

export const sliderEyebrow = recipe({
  base: style([
    {
      color: vars.color.primary,
    },
  ]),
  variants: eyebrowVariants,
})

export const sliderContainer = style([
  {
    padding: vars.space.x4,
  },
])

export const sliderLabel = style([
  {
    textTransform: 'uppercase',
  },
])

export const sliderRoot = style([
  atoms({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    userSelect: 'none',
  }),
  {
    touchAction: 'none',
    selectors: {
      '&[data-orientation="horizontal"]': {
        height: 24,
      },
      '&[data-orientation="vertical"]': {
        flexDirection: 'column',
        width: 24,
      },
    },
  },
])

export const sliderTrack = style([
  atoms({
    position: 'relative',
    borderRadius: 'round',
  }),
  {
    backgroundColor: vars.color.neutral,
    position: 'relative',
    flexGrow: 1,
    selectors: {
      '&[data-orientation="horizontal"]': { height: 2 },
      '&[data-orientation="vertical"]': { width: 2 },
      '&[data-disabled]': {
        backgroundColor: vars.color.background2,
      },
    },
  },
])

export const sliderRange = style([
  atoms({
    position: 'absolute',
    borderRadius: 'round',
    height: '100%',
  }),
  {
    backgroundColor: vars.color.accent,
    selectors: {
      '&[data-disabled]': {
        backgroundColor: vars.color.neutral,
      },
    },
  },
])

export const sliderThumb = style([
  {
    all: 'unset',
    display: 'block',
    width: '22px',
    height: '22px',
    background: `${vars.color.background1} url(data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjZmZmIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMzIgMzIiIHdpZHRoPSIzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjY2NjIj48cmVjdCBoZWlnaHQ9IjEwIiByeD0iMSIgd2lkdGg9IjIiIHg9IjEzIiB5PSIxMSIvPjxyZWN0IGhlaWdodD0iMTAiIHJ4PSIxIiB3aWR0aD0iMiIgeD0iMTciIHk9IjExIi8+PC9nPjwvc3ZnPg==) center center no-repeat`,
    borderRadius: vars.radii.round,
    border: `2px solid ${vars.color.accent}`,
    cursor: 'pointer',
    selectors: {
      '&:hover': {
        backgroundColor: vars.color.background2,
      },
      '&:active': {
        backgroundColor: vars.color.neutral,
      },
      '&[data-disabled]': {
        backgroundColor: vars.color.background1,
        border: `2px solid ${vars.color.secondary}`,
      },
    },
  },
])

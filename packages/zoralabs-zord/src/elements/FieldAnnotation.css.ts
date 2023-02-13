import { vars } from '../theme'
import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { atoms } from '../atoms.css'

export const annotationVariants = {
  error: {
    true: {
      color: vars.color.negative,
    },
  },
  indentFields: {
    true: {
      margin: `0 ${vars.space.x3}`,
    },
  },
}

export const annotationText = recipe({
  base: [
    style({
      color: vars.color.secondary,
    }),
  ],
  variants: annotationVariants,
})

export const annotation = atoms({
  width: '100%',
})

/**
 * Ported from radix-ui
 * https://github.com/radix-ui/primitives/blob/main/packages/react/separator/src/Separator.tsx
 */
import { Box, BoxProps } from '../Box'
import { separator } from './Separator.css'
import clsx from 'clsx'
import React, { ElementType } from 'react'
import type { PolymorphicPropsWithRef } from 'react-polymorphic-types'

const ORIENTATIONS = ['horizontal', 'vertical'] as const
type Orientation = typeof ORIENTATIONS[number]

export interface SeparatorProps extends BoxProps {
  orientation?: Orientation
  decorative?: boolean
}

export type SeparatorComponentProps<E extends ElementType> = PolymorphicPropsWithRef<
  SeparatorProps,
  E
>

export function Separator<E extends ElementType>({
  orientation = 'horizontal',
  decorative = false,
  ...props
}: SeparatorComponentProps<E>) {
  const ariaOrientation = orientation === 'vertical' ? orientation : undefined
  const semanticProps = decorative
    ? { role: 'none' }
    : { 'aria-orientation': ariaOrientation, role: 'separator' }

  return (
    <Box
      {...props}
      className={[separator]}
      data-orientation={orientation}
      {...semanticProps}
    />
  )
}

import { tag } from './Tag.css'
import { Text, TextProps } from './Text'
import React, { ElementType } from 'react'
import type { PolymorphicPropsWithRef } from 'react-polymorphic-types'

export interface TagProps extends TextProps {
  active?: boolean
  inactive?: boolean
  showDot?: boolean
}

export type TagComponentProps<E extends ElementType> = PolymorphicPropsWithRef<
  TagProps,
  E
>

export function Tag({
  active,
  className,
  children,
  inactive,
  showDot,
  ...props
}: TagProps) {
  return (
    <Text
      className={['zord-tag', tag({ active, inactive, showDot }), className]}
      {...props}
    >
      {children}
    </Text>
  )
}

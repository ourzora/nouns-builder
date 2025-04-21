import { Box, BoxProps } from './Box'
import { input, inputVariants } from './Input.css'
import React, { ElementType, forwardRef } from 'react'
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithRef,
} from 'react-polymorphic-types'

export interface InputProps extends BoxProps {
  size?: keyof (typeof inputVariants)['sizeVariant']
}

export type InputComponentProps<E extends ElementType> = PolymorphicPropsWithRef<
  InputProps,
  E
>

function InnerInput<E extends ElementType = 'input'>(
  { className, sizeVariant, ...props }: InputComponentProps<E>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <Box
      ref={ref}
      as="input"
      className={['zord-input', input({ sizeVariant }), className]}
      {...props}
    />
  )
}

export const Input: PolymorphicForwardRefExoticComponent<InputProps, 'input'> =
  forwardRef(InnerInput)

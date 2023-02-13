import { BoxProps } from './Box';
import { inputVariants } from './Input.css';
import { ElementType } from 'react';
import type { PolymorphicForwardRefExoticComponent, PolymorphicPropsWithRef } from 'react-polymorphic-types';
export interface InputProps extends BoxProps {
    size?: keyof typeof inputVariants['sizeVariant'];
}
export type InputComponentProps<E extends ElementType> = PolymorphicPropsWithRef<InputProps, E>;
export declare const Input: PolymorphicForwardRefExoticComponent<InputProps, 'input'>;
//# sourceMappingURL=Input.d.ts.map
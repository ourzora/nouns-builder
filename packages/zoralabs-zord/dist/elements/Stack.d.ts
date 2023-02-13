import { FlexProps } from '../elements/Flex';
import { BoxDefaultElement } from './Box';
import React, { ElementType } from 'react';
import type { PolymorphicForwardRefExoticComponent, PolymorphicPropsWithRef } from 'react-polymorphic-types';
export interface StackProps extends FlexProps {
}
export type StackComponentProps<E extends ElementType> = PolymorphicPropsWithRef<StackProps, E>;
export declare function InnerStack<E extends ElementType = typeof BoxDefaultElement>(props: StackComponentProps<E>, ref?: React.ForwardedRef<E>): JSX.Element;
export declare const Stack: PolymorphicForwardRefExoticComponent<StackProps, typeof BoxDefaultElement>;
//# sourceMappingURL=Stack.d.ts.map
import { Atoms } from '../atoms';
import { BoxDefaultElement, BoxProps } from './Box';
import React from 'react';
import type { PolymorphicForwardRefExoticComponent, PolymorphicPropsWithRef } from 'react-polymorphic-types';
export interface FlexProps extends BoxProps {
    alignSelf?: Atoms['alignSelf'];
    gap?: Atoms['gap'];
    wrap?: Atoms['flexWrap'] | boolean;
    direction?: Atoms['flexDirection'];
    align?: Atoms['alignItems'];
    justify?: Atoms['justifyContent'];
    placeItems?: Atoms['placeItems'];
    flexChildren?: boolean;
}
export type FlexComponentProps<E extends React.ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<FlexProps, E>;
export declare const Flex: PolymorphicForwardRefExoticComponent<FlexProps, typeof BoxDefaultElement>;
//# sourceMappingURL=Flex.d.ts.map
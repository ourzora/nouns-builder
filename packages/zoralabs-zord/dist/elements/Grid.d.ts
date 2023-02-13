import { Atoms } from '../atoms';
import { BoxDefaultElement, BoxProps } from './Box';
import React, { ElementType, ForwardedRef } from 'react';
import type { PolymorphicForwardRefExoticComponent, PolymorphicPropsWithRef, PolymorphicPropsWithoutRef } from 'react-polymorphic-types';
export interface GridProps extends BoxProps {
    gap?: Atoms['gap'];
    align?: Atoms['alignItems'];
    justify?: Atoms['justifyContent'];
    columns?: React.CSSProperties['gridTemplateColumns'] | 'auto';
    rows?: React.CSSProperties['gridTemplateRows'] | 'auto';
    autoRows?: Atoms['gridAutoRows'] | true;
    autoColumns?: Atoms['gridAutoColumns'] | true;
}
export type GridComponentProps<E extends ElementType> = PolymorphicPropsWithRef<GridProps, E>;
export declare function InnerGrid<E extends ElementType>({ className, gap, align: alignItems, justify: justifyContent, columns, rows, autoRows, autoColumns, style, ...props }: PolymorphicPropsWithoutRef<GridProps, E>, ref?: ForwardedRef<E>): JSX.Element;
export declare const Grid: PolymorphicForwardRefExoticComponent<GridProps, typeof BoxDefaultElement>;
//# sourceMappingURL=Grid.d.ts.map
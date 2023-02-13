/**
 * Ported from radix-ui
 * https://github.com/radix-ui/primitives/blob/main/packages/react/separator/src/Separator.tsx
 */
import { BoxProps } from '../Box';
import { ElementType } from 'react';
import type { PolymorphicPropsWithRef } from 'react-polymorphic-types';
declare const ORIENTATIONS: readonly ["horizontal", "vertical"];
type Orientation = typeof ORIENTATIONS[number];
export interface SeparatorProps extends BoxProps {
    orientation?: Orientation;
    decorative?: boolean;
}
export type SeparatorComponentProps<E extends ElementType> = PolymorphicPropsWithRef<SeparatorProps, E>;
export declare function Separator<E extends ElementType>({ orientation, decorative, ...props }: SeparatorComponentProps<E>): JSX.Element;
export {};
//# sourceMappingURL=Separator.d.ts.map
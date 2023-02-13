import { TextProps } from './Text';
import { ElementType } from 'react';
import type { PolymorphicPropsWithRef } from 'react-polymorphic-types';
export interface TagProps extends TextProps {
    active?: boolean;
    inactive?: boolean;
    showDot?: boolean;
}
export type TagComponentProps<E extends ElementType> = PolymorphicPropsWithRef<TagProps, E>;
export declare function Tag({ active, className, children, inactive, showDot, ...props }: TagProps): JSX.Element;
//# sourceMappingURL=Tag.d.ts.map
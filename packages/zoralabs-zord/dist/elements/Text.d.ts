import { Atoms } from '../atoms';
import { BoxDefaultElement, BoxProps } from './Box';
import { textVariants } from './Text.css';
import { ElementType, ForwardedRef } from 'react';
import type { PolymorphicForwardRefExoticComponent, PolymorphicPropsWithRef, PolymorphicPropsWithoutRef } from 'react-polymorphic-types';
export { textVariants };
export interface TextProps extends BoxProps {
    align?: Atoms['textAlign'];
    inline?: boolean;
    italic?: boolean;
    textTransform?: Atoms['textTransform'];
    variant?: keyof typeof textVariants['variant'];
}
export type TextComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<TextProps, E>;
export declare function InnerText<E extends ElementType = typeof BoxDefaultElement>({ align, className, inline, italic, textTransform, variant, ...props }: PolymorphicPropsWithoutRef<TextProps, E>, ref?: ForwardedRef<E>): JSX.Element;
export declare const Text: PolymorphicForwardRefExoticComponent<TextProps, typeof BoxDefaultElement>;
export interface ParagraphProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}
export type ParagraphComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<ParagraphProps, E>;
export declare function Paragraph<E extends ElementType = typeof BoxDefaultElement>({ size, variant, ...props }: ParagraphComponentProps<E>): JSX.Element;
export interface HeadingProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}
export type HeadingComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<HeadingProps, E>;
export declare function Heading<E extends ElementType = typeof BoxDefaultElement>({ size, variant, ...props }: HeadingComponentProps<E>): JSX.Element;
export interface DisplayProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}
export type DisplayComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<DisplayProps, E>;
export declare function Display<E extends ElementType = typeof BoxDefaultElement>({ size, variant, ...props }: DisplayComponentProps<E>): JSX.Element;
export interface EyebrowProps extends Omit<TextProps, 'variant'> {
}
export type EyebrowComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<EyebrowProps, E>;
export declare function Eyebrow<E extends ElementType = typeof BoxDefaultElement>({ variant, ...props }: EyebrowComponentProps<E>): JSX.Element;
export interface LabelProps extends Omit<TextProps, 'variant'> {
    size?: 'xs' | 'sm' | 'md' | 'lg';
}
export type LabelComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<LabelProps, E>;
export declare function Label<E extends ElementType = typeof BoxDefaultElement>({ size, ...props }: LabelComponentProps<E>): JSX.Element;
export interface MenuProps extends TextProps {
}
export type MenuTextComponentProps<E extends ElementType = typeof BoxDefaultElement> = PolymorphicPropsWithRef<MenuProps, E>;
export declare function MenuText<E extends ElementType = typeof BoxDefaultElement>({ ...props }: MenuTextComponentProps<E>): JSX.Element;
//# sourceMappingURL=Text.d.ts.map
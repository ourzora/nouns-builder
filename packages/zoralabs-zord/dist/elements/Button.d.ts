import { FlexProps, IconProps } from '../elements';
import { iconVariants } from './Icon.css';
import { ElementType, ForwardedRef } from 'react';
import { PolymorphicForwardRefExoticComponent, PolymorphicPropsWithRef, PolymorphicPropsWithoutRef } from 'react-polymorphic-types';
export interface ButtonProps extends FlexProps {
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'positive' | 'destructive' | 'outline' | 'circle' | 'circleSolid' | 'ghost' | 'unset';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    icon?: IconProps['id'];
    iconAlign?: 'left' | 'right';
    type?: 'submit' | 'reset' | 'button';
    iconSize?: keyof typeof iconVariants['size'];
    loading?: boolean;
    pill?: boolean;
}
export declare const ButtonDefaultElement = "button";
export type ButtonComponentProps<E extends ElementType = typeof ButtonDefaultElement> = PolymorphicPropsWithRef<ButtonProps, E>;
export declare function InnerButton<E extends ElementType = typeof ButtonDefaultElement>({ as, disabled, className, children, icon, gap, px, iconSize, iconAlign, loading, pill, variant, size, type, ...props }: PolymorphicPropsWithoutRef<ButtonProps, E>, ref: ForwardedRef<E>): JSX.Element;
export declare const Button: PolymorphicForwardRefExoticComponent<ButtonProps, typeof ButtonDefaultElement>;
//# sourceMappingURL=Button.d.ts.map
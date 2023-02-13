import { BoxComponentProps, textVariants } from './';
import { IconProps } from './Icon';
import React from 'react';
import { PolymorphicForwardRefExoticComponent } from 'react-polymorphic-types';
export interface InputFieldProps extends BoxComponentProps<'input'> {
    name: string;
    value?: string | number;
    placeholder?: string;
    label?: string;
    affix?: string;
    type?: 'text' | 'number';
    step?: number;
    min?: number;
    max?: number;
    icon?: IconProps['id'];
    className?: string;
    disabled?: boolean;
    indentFields?: boolean;
    error?: string;
    canError?: boolean;
    description?: string;
    descriptionVariant?: keyof typeof textVariants['variant'];
    lowProfile?: boolean;
    headerElement?: React.ReactNode;
    affixElement?: React.ReactNode;
    variant?: 'sm' | 'lg';
    inlineButton?: React.ReactNode;
    disableWheelEvent?: boolean;
}
export declare function InnerInputField({ value, label, name, icon, type, description, error, canError, step, min, max, className, placeholder, affix, lowProfile, descriptionVariant, indentFields, disabled, onFocus, onBlur, headerElement, affixElement, variant, inlineButton, disableWheelEvent, ...props }: InputFieldProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element;
export declare const InputField: PolymorphicForwardRefExoticComponent<InputFieldProps, 'input'>;
//# sourceMappingURL=InputField.d.ts.map
import { FlexComponentProps } from '../elements/Flex';
import React from 'react';
import { ClassValue } from 'clsx';
export interface SelectProps extends FlexComponentProps<'select'> {
    autoFocus?: boolean;
    containerClassName?: ClassValue;
    defaultValue?: string;
    name?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    variant?: 'sm' | 'lg';
    disabled?: boolean;
    value?: string | number;
}
export declare const Select: ({ className, containerClassName, variant, children, disabled, ...props }: SelectProps) => JSX.Element;
//# sourceMappingURL=Select.d.ts.map
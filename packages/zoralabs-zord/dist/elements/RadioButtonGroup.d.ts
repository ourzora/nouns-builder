/// <reference types="react" />
import { RadioGroupProps } from '@radix-ui/react-radio-group';
import { ClassValue } from 'clsx';
interface RadioButtonGroupProps extends RadioGroupProps {
    items: Omit<RadioButtonProps, 'id'>[];
    buttonClassName?: ClassValue;
}
export interface RadioButtonProps {
    id: string;
    value: string;
    label?: string;
    disabled?: boolean;
}
export declare function RadioButtonGroup({ className, buttonClassName, items, ...props }: RadioButtonGroupProps): JSX.Element;
export {};
//# sourceMappingURL=RadioButtonGroup.d.ts.map
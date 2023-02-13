/// <reference types="react" />
import { TextProps } from './Text';
export interface RadioButtonGroupProps {
    label?: string;
    name: string;
    defaultValue?: string;
}
export interface RadioButtonProps extends TextProps {
    id: string;
    value: string;
    label?: string;
    disabled?: boolean;
}
export declare function RadioButton({ className, id, value, label, disabled, ...props }: RadioButtonProps): JSX.Element;
//# sourceMappingURL=RadioButton.d.ts.map
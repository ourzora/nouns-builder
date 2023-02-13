/// <reference types="react" />
import { BoxComponentProps } from './';
export interface TextAreaProps extends BoxComponentProps<'textarea'> {
    value?: string;
    name: string;
    placeholder?: string;
    label?: string;
    className?: string;
    initialHeight?: number;
    disabled?: boolean;
    indentFields?: boolean;
    error?: string;
    description?: string;
    style?: {
        [key: string]: number | string;
    };
}
export declare function TextArea({ value, label, name, description, error, className, style, placeholder, disabled, indentFields, initialHeight, ...props }: TextAreaProps): JSX.Element;
//# sourceMappingURL=TextArea.d.ts.map
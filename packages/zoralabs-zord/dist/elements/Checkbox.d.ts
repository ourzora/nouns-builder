import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Dispatch, SetStateAction } from 'react';
export interface CheckboxProps {
    label?: string;
    name: string;
    id: string;
    checked?: CheckboxPrimitive.CheckedState | boolean;
    className?: string;
    disabled?: boolean;
    defaultChecked?: boolean;
    onChange?: Dispatch<SetStateAction<CheckboxPrimitive.CheckedState>>;
    onClick?: () => void;
}
export declare function Checkbox({ label, id, name, className, checked, defaultChecked, disabled, onClick, onChange, ...props }: CheckboxProps): JSX.Element;
//# sourceMappingURL=Checkbox.d.ts.map
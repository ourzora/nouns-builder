import { textVariants } from './Text';
import { ReactNode } from 'react';
export interface SwitchProps {
    id?: string;
    value?: string;
    label?: string;
    textVariant?: keyof typeof textVariants['variant'];
    description?: string | ReactNode;
    descriptionVariant?: keyof typeof textVariants['variant'];
    disabled?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: () => void;
}
export declare function Switch({ id, value, label, description, descriptionVariant, defaultChecked, checked, disabled, onChange, textVariant, }: SwitchProps): JSX.Element;
//# sourceMappingURL=Switch.d.ts.map
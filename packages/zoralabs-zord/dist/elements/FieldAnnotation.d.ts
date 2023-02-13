import { FlexProps } from './Flex';
import { textVariants } from './Text';
import { ReactNode } from 'react';
export interface FieldAnnotationProps extends FlexProps {
    error?: string;
    description?: string | ReactNode;
    indentFields?: boolean;
    variant?: keyof typeof textVariants['variant'];
}
export declare function FieldAnnotation({ description, error, className, indentFields, variant, ...props }: FieldAnnotationProps): JSX.Element;
//# sourceMappingURL=FieldAnnotation.d.ts.map
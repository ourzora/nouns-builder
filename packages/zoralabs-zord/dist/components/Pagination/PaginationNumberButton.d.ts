/// <reference types="react" />
import { ButtonProps } from '../../elements';
interface PaginationNumberButtonProps extends ButtonProps {
    active: boolean;
    index: number;
    onClick: (index: number) => void;
}
export declare function PaginationNumberButton({ active, index, onClick, children, ...props }: PaginationNumberButtonProps): JSX.Element;
export {};
//# sourceMappingURL=PaginationNumberButton.d.ts.map
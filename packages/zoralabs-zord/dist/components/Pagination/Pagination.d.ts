/// <reference types="react" />
import { FlexProps } from '../../elements';
/**
 * Pagination component
 * - Pass PaginationProximityList as a child to render a the pagination buttons
 */
export interface PaginationProps extends FlexProps {
    isFirst: boolean;
    isLast: boolean;
    onNext: () => void;
    onPrevious: () => void;
    totalPages: number;
}
export declare function Pagination({ children, isFirst, isLast, onNext, onPrevious, totalPages, ...props }: PaginationProps): JSX.Element | null;
//# sourceMappingURL=Pagination.d.ts.map
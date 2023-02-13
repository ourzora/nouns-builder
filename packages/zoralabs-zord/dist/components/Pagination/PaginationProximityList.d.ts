/// <reference types="react" />
/**
 * List of pagination numbers, with ellipsis indicators
 */
export interface PaginationProximityListProps {
    index: number;
    items: number[];
    setIndex: (index: number) => void;
    totalPages: number;
}
export declare function PaginationProximityList({ index, items, setIndex, totalPages, }: PaginationProximityListProps): JSX.Element | null;
//# sourceMappingURL=PaginationProximityList.d.ts.map
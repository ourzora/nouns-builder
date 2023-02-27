import { PaginationEllipsis } from "./PaginationEllipsis";
import { PaginationNumberButton } from "./PaginationNumberButton";
import React from "react";

/**
 * List of pagination numbers, with ellipsis indicators
 */

export interface PaginationProximityListProps {
  index: number;
  items: number[];
  setIndex: (index: number) => void;
  totalPages: number;
}

export function PaginationProximityList({
  index,
  items,
  setIndex,
  totalPages,
}: PaginationProximityListProps) {
  if (totalPages < 2 || !items?.length) return null;

  return (
    <>
      {items.map((page, i) => {
        return page === -1 ? (
          <PaginationEllipsis key={`ellipsis-${i}`} />
        ) : (
          <PaginationNumberButton
            key={`${page}-${i}`}
            active={index === page}
            index={page}
            onClick={setIndex}
          >
            {page + 1}
          </PaginationNumberButton>
        );
      })}
    </>
  );
}

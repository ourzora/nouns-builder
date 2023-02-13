import { Button, Flex, FlexProps, Icon } from '../../elements'
import * as styles from './Pagination.css'
import React from 'react'

/**
 * Pagination component
 * - Pass PaginationProximityList as a child to render a the pagination buttons
 */

export interface PaginationProps extends FlexProps {
  isFirst: boolean
  isLast: boolean
  onNext: () => void
  onPrevious: () => void
  totalPages: number
}

export function Pagination({
  children,
  isFirst,
  isLast,
  onNext,
  onPrevious,
  totalPages,
  ...props
}: PaginationProps) {
  if (totalPages < 2) return null

  return (
    <Flex align="center" gap="x3" {...props}>
      <Button
        className={styles.button}
        variant="ghost"
        disabled={isFirst}
        onClick={onPrevious}
        pill
      >
        <Icon flip id="ArrowRight" size="lg" />
      </Button>

      {children}

      <Button
        variant="ghost"
        pill
        className={styles.button}
        disabled={isLast}
        onClick={onNext}
      >
        <Icon id="ArrowRight" size="lg" />
      </Button>
    </Flex>
  )
}

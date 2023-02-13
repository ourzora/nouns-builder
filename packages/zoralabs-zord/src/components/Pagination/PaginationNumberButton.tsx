import { Button, ButtonProps } from '../../elements'
import { vars } from '../../theme.css'
import * as styles from './Pagination.css'
import { useCallback } from 'react'
import React from 'react'

interface PaginationNumberButtonProps extends ButtonProps {
  active: boolean
  index: number
  onClick: (index: number) => void
}

export function PaginationNumberButton({
  active,
  index,
  onClick,
  children,
  ...props
}: PaginationNumberButtonProps) {
  const handleClick = useCallback(() => {
    onClick(index)
  }, [index, onClick])

  return (
    <Button
      {...props}
      className={[styles.button, active && styles.active]}
      variant="ghost"
      pill
      onClick={handleClick}
      style={{
        ...(active && {
          color: vars.color.onAccent,
        }),
      }}
    >
      {children}
    </Button>
  )
}

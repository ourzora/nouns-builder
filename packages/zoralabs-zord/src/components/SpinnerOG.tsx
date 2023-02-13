import { Box } from '../elements'
import { v4 } from 'uuid'
import React from 'react'
import { rotateKeyframes } from '../elements/Icon.css'

export interface SpinnerOGProps {
  size?: number | string
  className?: string
}

export function SpinnerOG({ size = 30, className }: SpinnerOGProps) {
  const top = v4()
  const bottom = v4()
  return (
    <Box
      className={className}
      style={{
        width: size === 'auto' ? '1em' : size,
        height: size === 'auto' ? '1em' : size,
        transformOrigin: '50%',
        animation: `${rotateKeyframes} 900ms infinite linear`,
        transform: 'translateZ(0)',
      }}
    >
      <svg width="100%" viewBox="-10 -10 90 90">
        <g>
          <defs>
            <linearGradient id={top}>
              <stop offset="50%" stopOpacity="0.5" stopColor="currentColor" />
              <stop offset="95%" stopOpacity="0" stopColor="currentColor" />
            </linearGradient>
            <linearGradient id={bottom}>
              <stop offset="0%" stopOpacity="0.5" stopColor="currentColor" />
              <stop offset="75%" stopOpacity="1" stopColor="currentColor" />
            </linearGradient>
          </defs>
          <g strokeWidth="16" fill="none">
            <path stroke={`url(#${top})`} d="M 67 35 A 32 32 0 0 1 3 35"></path>
            <path stroke={`url(#${bottom})`} d="M 3 35 A 32 32 180 0 1 67 35"></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              d="M 67 35 A 32 32 0 0 1 67 36"
            />
          </g>
        </g>
      </svg>
    </Box>
  )
}

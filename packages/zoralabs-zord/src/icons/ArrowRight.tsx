import * as React from 'react'
import { SVGProps } from 'react'

const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M9.021 12.943a1 1 0 0 1-1.414-1.414l3.535-3.536-3.535-3.536a1 1 0 0 1 1.414-1.414l4.253 4.254a.984.984 0 0 1 0 1.392l-4.253 4.254Z" />
    <path d="M1.9 7.95a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2h-8a1 1 0 0 1-1-1Z" />
  </svg>
)

export default SvgArrowRight

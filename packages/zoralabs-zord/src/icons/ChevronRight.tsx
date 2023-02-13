import * as React from 'react'
import { SVGProps } from 'react'

const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M5.207 14.893a1 1 0 1 1-1.414-1.414l5.535-5.536-5.535-5.536A1 1 0 0 1 5.207.993l6.253 6.254a.984.984 0 0 1 0 1.392l-6.253 6.254Z" />
  </svg>
)

export default SvgChevronRight

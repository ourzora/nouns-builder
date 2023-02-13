import * as React from 'react'
import { SVGProps } from 'react'

const SvgChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10.041.993a1 1 0 1 1 1.415 1.414L5.92 7.943l5.536 5.536a1 1 0 0 1-1.415 1.414L3.788 8.639a.984.984 0 0 1 0-1.392L10.041.993Z" />
  </svg>
)

export default SvgChevronLeft

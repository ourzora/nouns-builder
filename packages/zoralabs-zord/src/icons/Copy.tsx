import * as React from 'react'
import { SVGProps } from 'react'

const SvgCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11 12H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1Z" />
    <path d="M15 16H4v-2h10V4h2v11a1 1 0 0 1-1 1Z" />
  </svg>
)

export default SvgCopy

import * as React from 'react'
import { SVGProps } from 'react'

const SvgCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8.5 20a1.5 1.5 0 0 1-1.061-.439L.379 12.5l2.12-2.121 6 6 13-13L23.622 5.5 9.56 19.561A1.501 1.501 0 0 1 8.5 20Z" />
  </svg>
)

export default SvgCheck

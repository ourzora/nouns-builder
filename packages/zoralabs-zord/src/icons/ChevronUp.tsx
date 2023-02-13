import * as React from 'react'
import { SVGProps } from 'react'

const SvgChevronUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14.943 10.541a1 1 0 0 1-1.414 1.415L7.993 6.42l-5.536 5.536a1 1 0 0 1-1.414-1.415l6.254-6.253a.984.984 0 0 1 1.392 0l6.254 6.253Z" />
  </svg>
)

export default SvgChevronUp

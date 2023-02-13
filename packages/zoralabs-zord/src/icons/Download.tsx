import * as React from 'react'
import { SVGProps } from 'react'

const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 14.5a1 1 0 0 1 1 1v4h14.667v-4a1 1 0 1 1 2 0v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.333 2a1 1 0 0 1 1 1v12.5a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.626 9.793a1 1 0 0 1 1.414 0l4.293 4.293 4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 0-1.414Z"
    />
  </svg>
)

export default SvgDownload

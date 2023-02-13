import * as React from 'react'
import { SVGProps } from 'react'

const SvgEmbed = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6.707 7.293a1 1 0 0 1 0 1.414L3.414 12l3.293 3.293a1 1 0 1 1-1.414 1.414L2 13.414a2 2 0 0 1 0-2.828l3.293-3.293a1 1 0 0 1 1.414 0Zm10.586 0a1 1 0 0 1 1.414 0l3.646 3.646a1.5 1.5 0 0 1 0 2.122l-3.646 3.646a1 1 0 0 1-1.414-1.414L20.586 12l-3.293-3.293a1 1 0 0 1 0-1.414ZM14.242 3.03a1 1 0 0 1 .728 1.213l-4 16a1 1 0 1 1-1.94-.485l4-16a1 1 0 0 1 1.212-.728Z"
    />
  </svg>
)

export default SvgEmbed

import * as React from 'react'
import { SVGProps } from 'react'

const SvgWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.8 12.526 9.485.88A1.668 1.668 0 0 0 8.8.2a1.693 1.693 0 0 0-2.284.68L.2 12.526A1.678 1.678 0 0 0 1.687 15h12.628a1.7 1.7 0 0 0 1.308-.615 1.675 1.675 0 0 0 .179-1.86H15.8ZM8 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-3.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4Z"
      clipPath="url(#a)"
    />
  </svg>
)

export default SvgWarning

import * as React from 'react'
import { SVGProps } from 'react'

const SvgAudio = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 12 18"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6 0v10.555A3.95 3.95 0 0 0 4 10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V4h4V0H6Z" />
  </svg>
)

export default SvgAudio

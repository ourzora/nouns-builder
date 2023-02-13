import * as React from 'react'
import { SVGProps } from 'react'

const SvgVideo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 18 12"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14 4.5V1c0-.55-.45-1-1-1H1C.45 0 0 .45 0 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V7.5l4 4V.5l-4 4Z" />
  </svg>
)

export default SvgVideo

import * as React from 'react'
import { SVGProps } from 'react'

const SvgBell = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10 14H6c0 1.1.9 2 2 2s2-.9 2-2Zm5-3h-.5c-.7-.7-1.5-1.7-1.5-3V5c0-2.8-2.2-5-5-5S3 2.2 3 5v3c0 1.3-.8 2.3-1.5 3H1c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1Z" />
  </svg>
)

export default SvgBell

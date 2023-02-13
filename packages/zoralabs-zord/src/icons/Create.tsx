import * as React from 'react'
import { SVGProps } from 'react'

const SvgCreate = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13.5 0h-1a.5.5 0 0 0-.5.5V2h-1.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5H12v1.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V4h1.5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H14V.5a.5.5 0 0 0-.5-.5Zm-2.006 7.772a4.963 4.963 0 0 1-3.266-3.266A5.069 5.069 0 0 1 8.1 2H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7.9a5.069 5.069 0 0 1-2.506-.128ZM12 14H2v-2h10v2Z" />
  </svg>
)

export default SvgCreate

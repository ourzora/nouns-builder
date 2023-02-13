import * as React from 'react'
import { SVGProps } from 'react'

const SvgFile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M2 0C.9 0 .01.9.01 2L0 18c0 1.1.89 2 1.99 2H14c1.1 0 2-.9 2-2V6l-6-6H2Zm7 7V1.5L14.5 7H9Z" />
  </svg>
)

export default SvgFile

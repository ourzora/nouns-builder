import * as React from 'react'
import { SVGProps } from 'react'

const SvgPencil = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 19 19"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M0 15.25V19h3.75L14.81 7.94l-3.75-3.75L0 15.25ZM17.71 5.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" />
  </svg>
)

export default SvgPencil

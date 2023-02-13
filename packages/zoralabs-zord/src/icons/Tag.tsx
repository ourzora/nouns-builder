import * as React from 'react'
import { SVGProps } from 'react'

const SvgTag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m15.7 8.3-8-8C7.5.1 7.3 0 7 0H1C.4 0 0 .4 0 1v6c0 .3.1.5.3.7l8 8c.2.2.4.3.7.3.3 0 .5-.1.7-.3l6-6c.4-.4.4-1 0-1.4ZM4 5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1Z" />
  </svg>
)

export default SvgTag

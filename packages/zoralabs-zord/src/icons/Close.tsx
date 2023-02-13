import * as React from 'react'
import { SVGProps } from 'react'

const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M13.7 2.3c-.4-.4-1-.4-1.4 0L8 6.6 3.7 2.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4L6.6 8l-4.3 4.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3.3 0 .5-.1.7-.3L8 9.4l4.3 4.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L9.4 8l4.3-4.3c.4-.4.4-1 0-1.4Z" />
  </svg>
)

export default SvgClose

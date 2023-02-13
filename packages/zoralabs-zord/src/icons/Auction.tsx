import * as React from 'react'
import { SVGProps } from 'react'

const SvgAuction = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7.414.707a1 1 0 0 1 1.414 0l2.586 2.586a1 1 0 0 1 0 1.414l-.707.707a1 1 0 0 1-1.414 0L6.707 2.828a1 1 0 0 1 0-1.414l.707-.707ZM5.768 3.646a1 1 0 0 0-1.414 0l-.707.708a1 1 0 0 0 0 1.414l9.585 9.585a1 1 0 0 0 1.415 0l.707-.707a1 1 0 0 0 0-1.414L5.768 3.646ZM.5 14a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-7ZM2.828 6.707a1 1 0 0 0-1.414 0l-.707.707a1 1 0 0 0 0 1.414l2.586 2.586a1 1 0 0 0 1.414 0l.707-.707a1 1 0 0 0 0-1.414L2.828 6.707Z" />
  </svg>
)

export default SvgAuction

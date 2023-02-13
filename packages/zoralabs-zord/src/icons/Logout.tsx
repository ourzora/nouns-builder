import * as React from 'react'
import { SVGProps } from 'react'

const SvgLogout = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M11 12.414 15.414 8 11 3.586 9.586 5l2 2H5v2h6.586l-2 2L11 12.414Z" />
    <path d="M12 14H3V2h9V0H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h10v-2Z" />
  </svg>
)

export default SvgLogout

import * as React from 'react'
import { SVGProps } from 'react'

const SvgArrowRightAngle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.212 3.374h-7.2v-2h10.614v10.615h-2V4.788L1.971 15.443.557 14.029 11.212 3.374Z"
    />
  </svg>
)

export default SvgArrowRightAngle

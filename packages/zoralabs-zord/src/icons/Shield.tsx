import * as React from 'react'
import { SVGProps } from 'react'

const SvgShield = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.637 2.162 8.137.02a.491.491 0 0 0-.274 0l-7.5 2.142A.5.5 0 0 0 0 2.643c0 10.41 7.753 13.3 7.832 13.328a.5.5 0 0 0 .336 0C8.247 15.943 16 13.053 16 2.643a.5.5 0 0 0-.363-.481ZM10.274 10.5 8 9.3l-2.274 1.2.435-2.531-1.842-1.795 2.544-.369L8 3.5l1.137 2.3 2.544.369-1.842 1.8.435 2.531Z"
      clipPath="url(#a)"
    />
  </svg>
)

export default SvgShield

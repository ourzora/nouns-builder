import * as React from 'react'
import { SVGProps } from 'react'

const SvgWalletConnect = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={16} height={16} rx={3.5} fill="#fff" />
    <path
      d="M4.85 5.87a4.9 4.9 0 0 1 6.8 0l.22.22a.22.22 0 0 1 0 .33l-.77.75a.14.14 0 0 1-.17 0l-.31-.3a3.41 3.41 0 0 0-4.74 0l-.33.32a.12.12 0 0 1-.17 0l-.77-.75a.22.22 0 0 1 0-.33Zm8.39 1.55.69.67a.24.24 0 0 1 0 .33l-3.1 3a.25.25 0 0 1-.34 0l-2.2-2.13a.06.06 0 0 0-.08 0L6 11.43a.25.25 0 0 1-.34 0l-3.1-3a.24.24 0 0 1 0-.33l.69-.67a.25.25 0 0 1 .34 0L5.8 9.56a.06.06 0 0 0 .08 0l2.2-2.14a.25.25 0 0 1 .34 0l2.2 2.14a.06.06 0 0 0 .08 0l2.2-2.14a.25.25 0 0 1 .34 0Z"
      fill="#3b99fc"
    />
  </svg>
)

export default SvgWalletConnect

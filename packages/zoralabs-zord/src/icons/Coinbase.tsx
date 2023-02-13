import * as React from 'react'
import { SVGProps } from 'react'

const SvgCoinbase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0 7.22c0-2.53 0-3.79.49-4.76a4.47 4.47 0 0 1 2-2C3.43 0 4.69 0 7.22 0h1.56c2.53 0 3.79 0 4.76.49a4.47 4.47 0 0 1 2 2c.49 1 .49 2.23.49 4.76v1.53c0 2.53 0 3.79-.49 4.76a4.47 4.47 0 0 1-2 2c-1 .49-2.23.49-4.76.49H7.22c-2.53 0-3.79 0-4.76-.49a4.47 4.47 0 0 1-2-2C0 12.57 0 11.31 0 8.78Z"
      fill="#325eed"
    />
    <path d="M13.74 8A5.74 5.74 0 1 1 8 2.26 5.74 5.74 0 0 1 13.74 8Z" fill="#fff" />
    <path
      d="M6.36 6.56a.41.41 0 0 1 .41-.41h2.87a.41.41 0 0 1 .41.41v2.88a.41.41 0 0 1-.41.41H6.77a.41.41 0 0 1-.41-.41Z"
      fill="#335fed"
    />
  </svg>
)

export default SvgCoinbase

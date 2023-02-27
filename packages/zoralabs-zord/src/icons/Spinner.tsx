import * as React from "react";
import { SVGProps } from "react";

const SvgSpinner = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.4}
      d="M12 24a12 12 0 1 1 12-12 12.013 12.013 0 0 1-12 12Zm0-22a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Z"
    />
    <path d="M24 12h-2A10.011 10.011 0 0 0 12 2V0a12.013 12.013 0 0 1 12 12Z" />
  </svg>
);

export default SvgSpinner;

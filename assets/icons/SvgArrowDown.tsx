import type { SVGProps } from "react";
import React from "react";

const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.99992 1C7.36811 1 7.66658 1.29848 7.66658 1.66667V10.7239L10.5285 7.86193C10.7889 7.60158 11.211 7.60158 11.4713 7.86193C11.7317 8.12228 11.7317 8.54439 11.4713 8.80474L7.47132 12.8047C7.3463 12.9298 7.17673 13 6.99992 13C6.82311 13 6.65354 12.9298 6.52851 12.8047L2.52851 8.80474C2.26816 8.54439 2.26816 8.12228 2.52851 7.86193C2.78886 7.60158 3.21097 7.60158 3.47132 7.86193L6.33325 10.7239V1.66667C6.33325 1.29848 6.63173 1 6.99992 1Z"
        fill="#F9F9F9"
      />
    </svg>
  );
};

export default SvgArrowDown;

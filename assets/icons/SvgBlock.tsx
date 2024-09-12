import type { SVGProps } from "react";
import React from "react";

const SvgBlock = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <g clipPath="url(#clip0_136_224)">
        <path d="M1.68636 3.28537L6.99997 6.23737L12.3136 3.28535L7.32376 0.513216C7.12241 0.401356 6.87759 0.401356 6.67624 0.513216L1.68636 3.28537Z" />
        <path d="M13 4.4293L7.66664 7.39228V13.2963L12.6571 10.5239C12.8687 10.4063 13 10.1832 13 9.94108V4.4293Z" />
        <path d="M6.33331 13.2963V7.39228L1 4.42933V9.94108C1 10.1832 1.13126 10.4063 1.3429 10.5239L6.33331 13.2963Z" />
      </g>
      <defs>
        <clipPath id="clip0_136_224">
          <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.333374 0.333374)" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default SvgBlock;

import type { SVGProps } from "react";
import React from "react";

const SvgToken = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none" {...props}>
      <path
        d="M0.5 12.5C0.5 6.14873 5.64873 1 12 1C18.3513 1 23.5 6.14873 23.5 12.5C23.5 18.8513 18.3513 24 12 24C5.64873 24 0.5 18.8513 0.5 12.5Z"
        fill="#1D2E40"
      />
      <path
        d="M0.5 12.5C0.5 6.14873 5.64873 1 12 1C18.3513 1 23.5 6.14873 23.5 12.5C23.5 18.8513 18.3513 24 12 24C5.64873 24 0.5 18.8513 0.5 12.5Z"
        stroke="#334155"
      />
      <path
        d="M8.54637 9.36493C8.18212 9.36493 8 9.20709 8 8.89141V7.97352C8 7.65784 8.18212 7.5 8.54637 7.5H16.0352C16.3995 7.5 16.5816 7.65784 16.5816 7.97352V8.89141C16.5816 9.20709 16.3995 9.36493 16.0352 9.36493H13.3544V17.5459C13.3544 17.813 13.233 17.9465 12.9901 17.9465H11.5914C11.3486 17.9465 11.2272 17.813 11.2272 17.5459V9.36493H8.54637Z"
        fill="#94A3B8"
      />
    </svg>
  );
};

export default SvgToken;

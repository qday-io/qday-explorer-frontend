import type { SVGProps } from "react";
import React from "react";

const SvgX = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none" {...props}>
      <ellipse cx="16" cy="15.936" rx="16" ry="15.936" fill="#F9F9F9" />
      <path d="M22.7754 7.60998L23.8903 8.05462L17.5408 14.8122L16.433 14.3862L22.7754 7.60998Z" fill="black" />
      <path d="M14.3489 16.6464L15.4877 17.0654L8.62916 24.3688L7.49698 23.9689L14.3489 16.6464Z" fill="black" />
      <path
        d="M19.8254 22.9573L9.2975 8.82466L12.3054 8.83973L22.8268 22.9573L19.8254 22.9573Z"
        stroke="black"
        strokeWidth="1.664"
      />
    </svg>
  );
};

export default SvgX;

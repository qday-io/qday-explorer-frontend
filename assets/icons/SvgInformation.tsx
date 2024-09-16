import type { SVGProps } from "react";
import React from "react";

const SvgInformation = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <path d="M7 7.66667C6.63181 7.66667 6.33333 7.36819 6.33333 7V4.33333C6.33333 3.96514 6.63181 3.66667 7 3.66667C7.36819 3.66667 7.66667 3.96514 7.66667 4.33333V7C7.66667 7.36819 7.36819 7.66667 7 7.66667Z" />
      <path d="M7 8.66667C6.53976 8.66667 6.16667 9.03976 6.16667 9.5C6.16667 9.96024 6.53976 10.3333 7 10.3333C7.46024 10.3333 7.83333 9.96024 7.83333 9.5C7.83333 9.03976 7.46024 8.66667 7 8.66667Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 2.33333C1 1.59695 1.59695 1 2.33333 1H11.6667C12.403 1 13 1.59695 13 2.33333V11.6667C13 12.403 12.403 13 11.6667 13H2.33333C1.59695 13 1 12.403 1 11.6667V2.33333ZM11.6667 2.33333H2.33333V11.6667H11.6667V2.33333Z"
      />
    </svg>
  );
};

export default SvgInformation;

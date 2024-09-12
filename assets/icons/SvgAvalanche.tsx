import type { SVGProps } from "react";
import React from "react";

const SvgAvalanche = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
      <circle cx="7.00004" cy="7.00004" r="6.66667" fill="#E84142" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.39906 2.3124C7.16808 1.91345 6.80063 1.91345 6.56966 2.3124L2.37543 9.69822C2.14446 10.1024 2.33344 10.4226 2.79538 10.4226H4.90037C5.32556 10.3964 5.70877 10.1707 5.93974 9.81371L8.47517 5.42001C8.6589 5.04205 8.6589 4.59586 8.47517 4.21791L7.71926 2.88982L7.39906 2.3124ZM10.1866 7.1734C9.95563 6.77445 9.58293 6.77445 9.35196 7.1734L7.88739 9.69833C7.66167 10.0973 7.85065 10.4227 8.30734 10.4227H11.205C11.6669 10.4227 11.8559 10.0973 11.6249 9.69833L10.1866 7.1734Z"
        fill="white"
      />
    </svg>
  );
};

export default SvgAvalanche;

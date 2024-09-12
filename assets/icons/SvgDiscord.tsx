import type { SVGProps } from "react";
import React from "react";

const SvgDiscord = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
        fill="#F9F9F9"
      />
      <path
        d="M23.6361 8.71191C22.1907 8.03887 20.6648 7.56139 19.0974 7.29167C18.8829 7.68164 18.6888 8.08287 18.5159 8.49368C16.8463 8.23779 15.1484 8.23779 13.4788 8.49368C13.3059 8.08291 13.1118 7.68169 12.8974 7.29167C11.329 7.56367 9.80206 8.04228 8.35518 8.71543C5.48276 13.0377 4.70409 17.2527 5.09342 21.4078C6.77559 22.6718 8.65841 23.6332 10.66 24.25C11.1108 23.6335 11.5096 22.9794 11.8523 22.2948C11.2014 22.0475 10.5731 21.7425 9.97481 21.3831C10.1323 21.267 10.2863 21.1473 10.4351 21.0312C12.176 21.8638 14.0762 22.2956 16 22.2956C17.9238 22.2956 19.8239 21.8638 21.5649 21.0312C21.7154 21.1561 21.8694 21.2758 22.0252 21.3831C21.4257 21.743 20.7963 22.0487 20.1442 22.2965C20.4865 22.9809 20.8854 23.6344 21.3365 24.25C23.3398 23.6356 25.2241 22.6748 26.9065 21.4095C27.3634 16.5909 26.1261 12.4147 23.6361 8.71191ZM12.3454 18.8524C11.2605 18.8524 10.3641 17.851 10.3641 16.6191C10.3641 15.3872 11.2293 14.377 12.342 14.377C13.4546 14.377 14.344 15.3872 14.325 16.6191C14.3059 17.851 13.4511 18.8524 12.3454 18.8524ZM19.6545 18.8524C18.5679 18.8524 17.675 17.851 17.675 16.6191C17.675 15.3872 18.5402 14.377 19.6545 14.377C20.7689 14.377 21.6514 15.3872 21.6324 16.6191C21.6133 17.851 20.7602 18.8524 19.6545 18.8524Z"
        fill="#2B2B2B"
      />
    </svg>
  );
};

export default SvgDiscord;

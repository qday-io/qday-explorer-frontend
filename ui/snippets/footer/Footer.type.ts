import type { SVGProps } from "react";

export type SocialMediaItemType = {
  logo: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  link: string;
};

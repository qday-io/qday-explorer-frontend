import { Tooltip, chakra } from "@chakra-ui/react";
import type { As } from "@chakra-ui/react";
import React from "react";

import shortenString from "lib/shortenString";

interface Props {
  hash: string;
  isTooltipDisabled?: boolean;
  type?: "long" | "short";
  as?: As;
  style?: React.CSSProperties;
}

const HashStringShorten = ({ hash, isTooltipDisabled, as = "span", type, style }: Props) => {
  const charNumber = type === "long" ? 16 : 7;
  if (hash.length <= charNumber) {
    return <chakra.span as={as}>{hash}</chakra.span>;
  }

  return (
    <Tooltip label={hash} isDisabled={isTooltipDisabled}>
      <chakra.span style={style} as={as}>
        {shortenString(hash, charNumber)}
      </chakra.span>
    </Tooltip>
  );
};

export default HashStringShorten;

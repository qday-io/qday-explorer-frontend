import { Skeleton, Tag as ChakraTag } from "@chakra-ui/react";
import type { TagProps } from "@chakra-ui/react";
import React from "react";

import TruncatedTextTooltip from "ui/shared/TruncatedTextTooltip";

export interface Props extends TagProps {
  isLoading?: boolean;
  style?: React.CSSProperties;
  childStyle?: React.CSSProperties;
}

const Tag = ({ isLoading, style, childStyle, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) => {
  if (props.isTruncated && typeof props.children === "string") {
    if (!props.children) {
      return null;
    }

    return (
      <Skeleton isLoaded={!isLoading} display="inline-block" borderRadius="sm" maxW="100%" style={style}>
        <TruncatedTextTooltip label={props.children}>
          <ChakraTag {...props} ref={ref} style={childStyle} />
        </TruncatedTextTooltip>
      </Skeleton>
    );
  }
  return (
    <Skeleton isLoaded={!isLoading} display="inline-block" borderRadius="sm" maxW="100%" style={style}>
      <ChakraTag {...props} ref={ref} style={childStyle} />
    </Skeleton>
  );
};

export default React.memo(React.forwardRef(Tag));

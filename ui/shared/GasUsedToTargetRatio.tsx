import type { SkeletonProps } from "@chakra-ui/react";
import { Skeleton, Tooltip } from "@chakra-ui/react";
import React from "react";

type Props = {
  value: number;
  isLoading?: boolean;
  contentProps?: SkeletonProps;
};

const GasUsedToTargetRatio = ({ value, isLoading, contentProps }: Props) => {
  return (
    <Tooltip label="% of Gas Target">
      <Skeleton color="text_secondary" isLoaded={!isLoading} {...contentProps}>
        <span>{(value > 0 ? "+" : "") + value.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</span>
      </Skeleton>
    </Tooltip>
  );
};

export default React.memo(GasUsedToTargetRatio);

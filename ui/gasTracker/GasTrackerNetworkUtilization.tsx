import { Skeleton, chakra } from "@chakra-ui/react";
import { color as colorConfig } from "enums/colors";
import React from "react";

import { mdash } from "lib/html-entities";

interface Props {
  percentage: number;
  isLoading: boolean;
}

const GasTrackerNetworkUtilization = ({ percentage, isLoading }: Props) => {
  const load = (() => {
    if (percentage > 80) {
      return "high";
    }

    if (percentage > 50) {
      return "medium";
    }

    return "low";
  })();

  const colors = {
    high: "red.600",
    medium: "orange.600",
    low: colorConfig.textGreen,
  };
  const color = colors[load];

  return (
    <Skeleton
      isLoaded={!isLoading}
      whiteSpace="pre-wrap"
      fontSize={{ base: 12, md: 16 }}
      fontWeight={400}
      color={colorConfig.textPrimary}
    >
      <span>Network utilization </span>
      <chakra.span color={color}>
        {percentage.toFixed(2)}% {mdash} {load} load
      </chakra.span>
    </Skeleton>
  );
};

export default React.memo(GasTrackerNetworkUtilization);

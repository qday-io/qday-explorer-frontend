import type { SkeletonProps } from "@chakra-ui/react";
import { chakra, Tooltip, Box, useColorModeValue } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import React from "react";

import config from "configs/app";

import GasUsedToTargetRatio from "../GasUsedToTargetRatio";
import TextSeparator from "../TextSeparator";
import Utilization from "../Utilization/Utilization";

const rollupFeature = config.features.rollup;

interface Props {
  className?: string;
  gasUsed?: string;
  gasLimit: string;
  gasTarget?: number;
  isLoading?: boolean;
  gasUsedToTargetRatioContentProps?: SkeletonProps;
  progressUtilizationStyle?: React.CSSProperties;
  valueUtilizationStyle?: React.CSSProperties;
}

const BlockGasUsed = ({
  className,
  gasUsed,
  gasLimit,
  gasTarget,
  isLoading,
  gasUsedToTargetRatioContentProps,
  progressUtilizationStyle,
  valueUtilizationStyle,
}: Props) => {
  const hasGasUtilization =
    gasUsed &&
    gasUsed !== "0" &&
    (!rollupFeature.isEnabled || rollupFeature.type === "optimistic" || rollupFeature.type === "shibarium");

  const separatorColor = useColorModeValue("gray.200", "gray.700");

  if (!hasGasUtilization) {
    return null;
  }

  return (
    <>
      <Tooltip label={isLoading ? undefined : "Gas Used %"}>
        <Box>
          <Utilization
            colorScheme="gray"
            value={BigNumber(gasUsed).dividedBy(BigNumber(gasLimit)).toNumber()}
            isLoading={isLoading}
            className={className}
            progressUtilizationStyle={progressUtilizationStyle}
            valueUtilizationStyle={valueUtilizationStyle}
          />
        </Box>
      </Tooltip>
      {gasTarget && (
        <>
          <TextSeparator color={separatorColor} mx={1} />
          <GasUsedToTargetRatio
            value={gasTarget}
            isLoading={isLoading}
            contentProps={gasUsedToTargetRatioContentProps}
          />
        </>
      )}
    </>
  );
};

export default React.memo(chakra(BlockGasUsed));

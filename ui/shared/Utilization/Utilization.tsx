import { Box, Flex, chakra, useColorModeValue, Skeleton } from "@chakra-ui/react";
import clamp from "lodash/clamp";
import React from "react";

interface Props {
  className?: string;
  value: number;
  colorScheme?: "green" | "gray";
  isLoading?: boolean;
  valueUtilizationStyle?: React.CSSProperties;
  progressUtilizationStyle?: React.CSSProperties;
}

const WIDTH = 50;

const Utilization = ({
  className,
  value,
  colorScheme = "green",
  isLoading,
  valueUtilizationStyle,
  progressUtilizationStyle,
}: Props) => {
  const valueString = clamp(value * 100 || 0, 0, 100).toLocaleString(undefined, { maximumFractionDigits: 2 }) + "%";
  const colorGrayScheme = useColorModeValue("gray.500", "gray.400");
  const color = colorScheme === "gray" ? colorGrayScheme : "green.500";

  return (
    <Flex className={className} alignItems="center" columnGap={2}>
      <Skeleton isLoaded={!isLoading} w={`${WIDTH}px`} height="6px" borderRadius="full" overflow="hidden">
        <Box bg={useColorModeValue("blackAlpha.200", "whiteAlpha.200")} h="100%">
          <Box bg={color} w={valueString} h="100%" style={progressUtilizationStyle} />
        </Box>
      </Skeleton>
      <Skeleton isLoaded={!isLoading} color={color} fontWeight="bold">
        <span style={valueUtilizationStyle}>{valueString}</span>
      </Skeleton>
    </Flex>
  );
};

export default React.memo(chakra(Utilization));

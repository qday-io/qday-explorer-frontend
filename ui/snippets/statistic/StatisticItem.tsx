import type { BoxProps } from "@chakra-ui/react";
import { Box, Flex, Heading, Skeleton } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { GasPrices } from "types/api/stats";

import StatisticAdditionalInformation from "./StatisticAdditionalInformation";

type Props = BoxProps & {
  title: "Total blocks" | "Average block time" | "Total transactions" | "Wallet addresses" | "Gas tracker";
  value?: string;
  unit?: string;
  isLoading?: boolean;
  additionalInformation?: GasPrices | null;
  styleTitle?: React.CSSProperties;
  styleValue?: React.CSSProperties;
};

const StatisticItem = ({
  title,
  value,
  unit,
  additionalInformation,
  styleTitle,
  styleValue,
  isLoading,
  ...props
}: Props) => {
  return (
    <Box backgroundColor={color.fillOpacityBrand10} borderRadius={6} padding="8px 12px" flex={{ lg: 1 }} {...props}>
      <Flex alignItems="center" gap={2}>
        <Heading
          fontFamily="inherit"
          fontSize={{ base: 12, lg: 14 }}
          lineHeight={5}
          fontWeight={400}
          color={color.textSecondary}
          style={styleTitle}
        >
          {title}
        </Heading>
        {additionalInformation && <StatisticAdditionalInformation value={additionalInformation} />}
      </Flex>
      <Flex>
        <Skeleton
          isLoaded={!isLoading}
          fontSize={{ base: 14, lg: 20 }}
          lineHeight={{ base: 5, lg: 8 }}
          fontWeight={600}
          color={color.textPrimary}
          style={styleValue}
        >
          {value ?? "-"}
        </Skeleton>
        {unit && (
          <Skeleton
            isLoaded={!isLoading}
            fontSize={{ base: 14, lg: 20 }}
            lineHeight={{ base: 5, lg: 8 }}
            fontWeight={600}
            color={color.textPrimary}
            style={styleValue}
          >
            {isLoading ? "" : unit}
          </Skeleton>
        )}
      </Flex>
    </Box>
  );
};

export default StatisticItem;

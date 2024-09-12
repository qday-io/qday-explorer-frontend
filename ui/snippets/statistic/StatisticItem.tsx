import type { BoxProps } from "@chakra-ui/react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { GasPrices } from "types/api/stats";

import StatisticAdditionalInformation from "./StatisticAdditionalInformation";

type Props = BoxProps & {
  title: "Total blocks" | "Average block time" | "Total transactions" | "Wallet addresses" | "Gas tracker";
  value?: string;
  additionalInformation?: GasPrices | null;
  styleTitle?: React.CSSProperties;
  styleValue?: React.CSSProperties;
};

const StatisticItem = ({ title, value, additionalInformation, styleTitle, styleValue, ...props }: Props) => {
  return (
    <Box backgroundColor={color.fillOpacityBrand10} borderRadius={6} padding="8px 12px" flex={1} {...props}>
      <Flex alignItems="center" gap={2}>
        <Heading
          fontFamily="inherit"
          fontSize={14}
          lineHeight={5}
          fontWeight={400}
          color={color.textSecondary}
          style={styleTitle}
        >
          {title}
        </Heading>
        {additionalInformation && <StatisticAdditionalInformation value={additionalInformation} />}
      </Flex>
      <Text as="h6" fontSize={20} lineHeight={8} fontWeight={600} color={color.textPrimary} style={styleValue}>
        {value ?? "-"}
      </Text>
    </Box>
  );
};

export default StatisticItem;

import { Flex } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { GasPrices } from "types/api/stats";

import GasTrackerPriceSnippet from "./GasTrackerPriceSnippet";

interface Props {
  prices: GasPrices;
  isLoading: boolean;
}

const GasTrackerPrices = ({ prices, isLoading }: Props) => {
  return (
    <Flex
      as="ul"
      flexDir={{ base: "column", lg: "row" }}
      borderColor={color.textBlack}
      borderWidth="2px"
      borderRadius="xl"
      overflow="hidden"
      sx={{
        "li:not(:last-child)": {
          borderColor: color.textBlack,
          borderRightWidth: { lg: "2px" },
          borderBottomWidth: { base: "2px", lg: "0" },
        },
      }}
    >
      {prices.fast && <GasTrackerPriceSnippet type="fast" data={prices.fast} isLoading={isLoading} />}
      {prices.average && <GasTrackerPriceSnippet type="average" data={prices.average} isLoading={isLoading} />}
      {prices.slow && <GasTrackerPriceSnippet type="slow" data={prices.slow} isLoading={isLoading} />}
    </Flex>
  );
};

export default React.memo(GasTrackerPrices);

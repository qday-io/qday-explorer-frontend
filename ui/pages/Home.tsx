import { Box, Flex, Text } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import config from "configs/app";
import ChainIndicators from "ui/home/indicators/ChainIndicators";
import LatestArbitrumL2Batches from "ui/home/latestBatches/LatestArbitrumL2Batches";
import LatestZkEvmL2Batches from "ui/home/latestBatches/LatestZkEvmL2Batches";
import LatestBlocks from "ui/home/LatestBlocks";
import Transactions from "ui/home/Transactions";
import SearchBar from "ui/snippets/searchBar/SearchBar";
import Statistic from "ui/snippets/statistic/Statistic";

const rollupFeature = config.features.rollup;

const Home = () => {
  return (
    <Box as="main">
      <Flex flexDir={{ base: "column", lg: "row" }} columnGap={5} rowGap={5} _empty={{ mt: 0 }}>
        <Box style={{ width: "60%", borderRadius: 12, overflow: "hidden" }}>
          <Flex
            direction="column"
            gap={6}
            backgroundImage="url('/static/Search-bg.png')"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            padding={6}
            height="100%"
          >
            <Text as="h4" fontSize={18} fontWeight={600} lineHeight={7} color={color.textPrimary}>
              The Qday Blockchain Explorer
            </Text>
            <SearchBar isHomepage style={{ padding: 10 }} />
          </Flex>
        </Box>

        <ChainIndicators style={{ backgroundColor: color.bgPopup }} />
      </Flex>
      <Box>
        <Statistic />
      </Box>
      <Flex mt={8} direction={{ base: "column", lg: "row" }} columnGap={12} rowGap={6}>
        {rollupFeature.isEnabled && rollupFeature.type === "zkEvm" && <LatestZkEvmL2Batches />}
        {rollupFeature.isEnabled && rollupFeature.type === "arbitrum" && <LatestArbitrumL2Batches />}
        {!(rollupFeature.isEnabled && (rollupFeature.type === "arbitrum" || rollupFeature.type === "zkEvm")) && (
          <LatestBlocks />
        )}
        <Box flexGrow={1}>
          <Transactions />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;

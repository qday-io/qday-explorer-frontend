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
        <Box style={{ borderRadius: 12, overflow: "hidden" }} width={{ base: "100%", lg: "60%" }}>
          <Flex
            direction="column"
            gap={{ base: 3, lg: 6 }}
            backgroundImage="url('/static/Search-bg.png')"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            padding={{ base: 3, lg: 6 }}
            height="100%"
          >
            <Text
              as="h4"
              fontSize={{ base: 16, lg: 18 }}
              lineHeight={{ base: 6, lg: 7 }}
              fontWeight={600}
              color={color.textPrimary}
            >
              The Qday Blockchain Explorer
            </Text>
            <SearchBar isHomepage />
          </Flex>
        </Box>

        <ChainIndicators style={{ backgroundColor: color.bgPopup }} display={{ base: "none", lg: "block" }} />
      </Flex>
      <Box
        marginY={{ base: 6, lg: 0 }}
        display={{ base: "flex", lg: "block" }}
        flexDirection={{ base: "column" }}
        gap={3}
      >
        <Statistic />
        <ChainIndicators style={{ backgroundColor: color.bgPopup }} display={{ base: "block", lg: "none" }} />
      </Box>
      <Flex marginTop={{ base: 0, lg: 8 }} direction={{ base: "column", lg: "row" }} columnGap={12} rowGap={6}>
        {rollupFeature.isEnabled && rollupFeature.type === "zkEvm" && <LatestZkEvmL2Batches />}
        {rollupFeature.isEnabled && rollupFeature.type === "arbitrum" && <LatestArbitrumL2Batches />}
        {!(rollupFeature.isEnabled && (rollupFeature.type === "arbitrum" || rollupFeature.type === "zkEvm")) && (
          <LatestBlocks />
        )}
        <Flex overflow="hidden" flex={1}>
          <Transactions />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;

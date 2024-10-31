import { Box } from "@chakra-ui/react";
import React from "react";

import useApiQuery from "lib/api/useApiQuery";
import { HOMEPAGE_STATS } from "stubs/stats";

import StatisticItem from "./StatisticItem";

const Statistic = () => {
  const statsQueryResult = useApiQuery("stats", {
    queryOptions: {
      refetchOnMount: false,
      placeholderData: HOMEPAGE_STATS,
    },
  });

  return (
    <Box
      gap={{ base: 3, lg: 4 }}
      display={{ base: "grid", lg: "flex" }}
      gridTemplateColumns="repeat(2, 1fr)"
      marginY={{ base: 0, lg: 10 }}
    >
      <StatisticItem
        title="Total blocks"
        value={statsQueryResult.data?.total_blocks.toString()}
        isLoading={statsQueryResult.isPlaceholderData}
      />
      <StatisticItem
        title="Average block time"
        value={statsQueryResult.data?.average_block_time.toString()}
        unit={statsQueryResult.data?.average_block_time.toString() ? "s" : undefined}
        isLoading={statsQueryResult.isPlaceholderData}
      />
      <StatisticItem
        title="Total transactions"
        value={statsQueryResult.data?.total_transactions.toString()}
        isLoading={statsQueryResult.isPlaceholderData}
      />
      <StatisticItem
        title="Wallet addresses"
        value={statsQueryResult.data?.total_addresses.toString()}
        isLoading={statsQueryResult.isPlaceholderData}
      />
      <StatisticItem
        gridColumn="span 2"
        title="Gas tracker"
        value={
          statsQueryResult.data?.gas_prices?.average
            ? `< ${statsQueryResult.data?.gas_prices?.average} QDAY`
            : undefined
        }
        additionalInformation={statsQueryResult.data?.gas_prices}
        isLoading={statsQueryResult.isPlaceholderData}
      />
    </Box>
  );
};
export default Statistic;

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
      <StatisticItem title="Total blocks" value={statsQueryResult.data?.total_blocks.toString()} />
      <StatisticItem title="Average block time" value={statsQueryResult.data?.average_block_time.toString()} />
      <StatisticItem title="Total transactions" value={statsQueryResult.data?.total_transactions.toString()} />
      <StatisticItem title="Wallet addresses" value={statsQueryResult.data?.total_addresses.toString()} />
      <StatisticItem
        gridColumn="span 2"
        title="Gas tracker"
        value={`< ${
          statsQueryResult.data?.gas_prices?.average?.price ?? statsQueryResult.data?.gas_prices?.average
        } Qday`}
        additionalInformation={statsQueryResult.data?.gas_prices}
      />
    </Box>
  );
};
export default Statistic;

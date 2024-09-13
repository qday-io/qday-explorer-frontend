import { Flex } from "@chakra-ui/react";
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
    <Flex gap={4} marginY={10}>
      <StatisticItem title="Total blocks" value={statsQueryResult.data?.total_blocks.toString()} />
      <StatisticItem title="Average block time" value={statsQueryResult.data?.average_block_time.toString()} />
      <StatisticItem title="Total transactions" value={statsQueryResult.data?.total_transactions.toString()} />
      <StatisticItem title="Wallet addresses" value={statsQueryResult.data?.total_addresses.toString()} />
      <StatisticItem
        title="Gas tracker"
        value={`< ${
          statsQueryResult.data?.gas_prices?.average?.price ?? statsQueryResult.data?.gas_prices?.average
        } Qday`}
        additionalInformation={statsQueryResult.data?.gas_prices}
      />
    </Flex>
  );
};
export default Statistic;

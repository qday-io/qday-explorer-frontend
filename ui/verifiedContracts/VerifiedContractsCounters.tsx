import { Box } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import config from "configs/app";
import useApiQuery from "lib/api/useApiQuery";
import { VERIFIED_CONTRACTS_COUNTERS } from "stubs/contract";
import StatsWidget from "ui/shared/stats/StatsWidget";

const VerifiedContractsCounters = () => {
  const countersQuery = useApiQuery("verified_contracts_counters", {
    queryOptions: {
      placeholderData: VERIFIED_CONTRACTS_COUNTERS,
    },
  });

  if (!countersQuery.data) {
    return null;
  }

  return (
    <Box columnGap={3} rowGap={3} mb={6} display="grid" gridTemplateColumns="repeat(2, 1fr)">
      <StatsWidget
        label="Total contracts"
        value={Number(countersQuery.data.smart_contracts).toLocaleString()}
        diff={countersQuery.data.new_smart_contracts_24h}
        diffFormatted={Number(countersQuery.data.new_smart_contracts_24h).toLocaleString()}
        isLoading={countersQuery.isPlaceholderData}
        href={
          config.features.stats.isEnabled ? { pathname: "/stats", query: { chartId: "contractsGrowth" } } : undefined
        }
        boxContainerProps={{
          display: "flex",
          flexDirection: "column",
          gap: { base: 0, md: 2 },
        }}
        labelProps={{
          fontSize: { base: 12, md: 14 },
          fontWeight: 400,
          color: color.textSecondary,
        }}
        valueProps={{
          fontSize: { base: 14, md: 20 },
          fontWeight: 600,
          color: color.textPrimary,
        }}
      />
      <StatsWidget
        label="Verified contracts"
        value={Number(countersQuery.data.verified_smart_contracts).toLocaleString()}
        diff={countersQuery.data.new_verified_smart_contracts_24h}
        diffFormatted={Number(countersQuery.data.new_verified_smart_contracts_24h).toLocaleString()}
        isLoading={countersQuery.isPlaceholderData}
        href={
          config.features.stats.isEnabled
            ? { pathname: "/stats", query: { chartId: "verifiedContractsGrowth" } }
            : undefined
        }
        boxContainerProps={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        labelProps={{
          fontSize: { base: 12, md: 14 },
          fontWeight: 400,
          color: color.textSecondary,
        }}
        valueProps={{
          fontSize: { base: 14, md: 20 },
          fontWeight: 600,
          color: color.textPrimary,
        }}
      />
    </Box>
  );
};

export default VerifiedContractsCounters;

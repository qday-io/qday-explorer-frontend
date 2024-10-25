import { Box } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import config from "configs/app";
import useApiQuery from "lib/api/useApiQuery";
import getCurrencyValue from "lib/getCurrencyValue";
import { thinsp } from "lib/html-entities";
import { HOMEPAGE_STATS } from "stubs/stats";
import { TXS_STATS } from "stubs/tx";
import StatsWidget from "ui/shared/stats/StatsWidget";

const TxsStats = () => {
  const txsStatsQuery = useApiQuery("txs_stats", {
    queryOptions: {
      placeholderData: TXS_STATS,
    },
  });

  const containerProps = {
    backgroundColor: color.popupHeader,
  };
  const boxContainerProps = {
    display: "flex",
    gap: { base: 0, md: 2 },
    paddingX: { base: 1, md: 0 },
    flexDir: "column" as const,
  };
  const labelProps = {
    fontSize: { base: 12, md: 14 },
    fontWeight: 400,
    color: color.textSecondary,
  };
  const valueProps = {
    fontSize: { base: 14, md: 20 },
    fontWeight: 600,
    color: color.textPrimary,
  };

  const statsQuery = useApiQuery("stats", {
    queryOptions: {
      placeholderData: HOMEPAGE_STATS,
    },
  });

  if (!txsStatsQuery.data) {
    return null;
  }

  const txFeeAvg = getCurrencyValue({
    value: txsStatsQuery.data.transaction_fees_avg_24h,
    exchangeRate: statsQuery.data?.coin_price,
    decimals: String(config.chain.currency.decimals),
    accuracyUsd: 2,
  });

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: "1fr 1fr", lg: "repeat(4, calc(25% - 9px))" }}
      gridTemplateRows={{ base: "1fr 1fr", lg: "1fr" }}
      rowGap={3}
      columnGap={3}
      mb={6}
    >
      <StatsWidget
        label="Transactions (24h)"
        value={Number(txsStatsQuery.data?.transactions_count_24h).toLocaleString()}
        isLoading={txsStatsQuery.isPlaceholderData}
        href={config.features.stats.isEnabled ? { pathname: "/stats", query: { chartId: "newTxns" } } : undefined}
        containerProps={containerProps}
        boxContainerProps={boxContainerProps}
        labelProps={labelProps}
        valueProps={valueProps}
      />
      <StatsWidget
        label="Pending transactions (1h)"
        value={Number(txsStatsQuery.data?.pending_transactions_count).toLocaleString()}
        isLoading={txsStatsQuery.isPlaceholderData}
        containerProps={containerProps}
        boxContainerProps={boxContainerProps}
        labelProps={labelProps}
        valueProps={valueProps}
      />
      <StatsWidget
        label="Transactions fees (24h) "
        value={(
          Number(txsStatsQuery.data?.transaction_fees_sum_24h) /
          10 ** config.chain.currency.decimals
        ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
        valuePostfix={thinsp + config.chain.currency.symbol}
        isLoading={txsStatsQuery.isPlaceholderData}
        href={config.features.stats.isEnabled ? { pathname: "/stats", query: { chartId: "txnsFee" } } : undefined}
        containerProps={containerProps}
        boxContainerProps={boxContainerProps}
        labelProps={labelProps}
        valueProps={valueProps}
      />
      <StatsWidget
        label="Avg. transaction fee (24h)"
        value={txFeeAvg.usd ? txFeeAvg.usd : txFeeAvg.valueStr}
        valuePrefix={txFeeAvg.usd ? "$" : undefined}
        valuePostfix={txFeeAvg.usd ? undefined : thinsp + config.chain.currency.symbol}
        isLoading={txsStatsQuery.isPlaceholderData}
        href={config.features.stats.isEnabled ? { pathname: "/stats", query: { chartId: "averageTxnFee" } } : undefined}
        containerProps={containerProps}
        boxContainerProps={boxContainerProps}
        labelProps={labelProps}
        valueProps={valueProps}
      />
    </Box>
  );
};

export default React.memo(TxsStats);

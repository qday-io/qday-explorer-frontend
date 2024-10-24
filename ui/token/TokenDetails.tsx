import { Box, Grid, Link, Skeleton, Text } from "@chakra-ui/react";
import type { UseQueryResult } from "@tanstack/react-query";
import BigNumber from "bignumber.js";
import { color } from "enums/colors";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { scroller } from "react-scroll";

import type { TokenInfo } from "types/api/token";

import config from "configs/app";
import type { ResourceError } from "lib/api/resources";
import useApiQuery from "lib/api/useApiQuery";
import throwOnResourceLoadError from "lib/errors/throwOnResourceLoadError";
import getCurrencyValue from "lib/getCurrencyValue";
import useIsMounted from "lib/hooks/useIsMounted";
import { TOKEN_COUNTERS } from "stubs/token";
import type { TokenTabs } from "ui/pages/Token";
import AppActionButton from "ui/shared/AppActionButton/AppActionButton";
import useAppActionData from "ui/shared/AppActionButton/useAppActionData";
import * as DetailsInfoItem from "ui/shared/DetailsInfoItem";
import TruncatedValue from "ui/shared/TruncatedValue";

import TokenNftMarketplaces from "./TokenNftMarketplaces";

interface Props {
  tokenQuery: UseQueryResult<TokenInfo, ResourceError<unknown>>;
}

const TokenDetails = ({ tokenQuery }: Props) => {
  const router = useRouter();
  const isMounted = useIsMounted();

  const hash = router.query.hash?.toString();

  const tokenCountersQuery = useApiQuery("token_counters", {
    pathParams: { hash },
    queryOptions: { enabled: Boolean(router.query.hash), placeholderData: TOKEN_COUNTERS },
  });

  const labelStyle = {
    alignItems: "center",
    color: color.textSecondary,
    fontWeight: 600,
  };

  const appActionData = useAppActionData(hash);

  const changeUrlAndScroll = useCallback(
    (tab: TokenTabs) => () => {
      router.push({ pathname: "/token/[hash]", query: { hash: hash || "", tab } }, undefined, { shallow: true });
      scroller.scrollTo("token-tabs", {
        duration: 500,
        smooth: true,
      });
    },
    [hash, router]
  );

  const countersItem = useCallback(
    (item: "token_holders_count" | "transfers_count") => {
      const itemValue = tokenCountersQuery.data?.[item];
      if (!itemValue) {
        return "N/A";
      }
      if (itemValue === "0") {
        return itemValue;
      }

      const tab: TokenTabs = item === "token_holders_count" ? "holders" : "token_transfers";

      return (
        <Skeleton isLoaded={!tokenCountersQuery.isPlaceholderData}>
          <Link
            onClick={changeUrlAndScroll(tab)}
            fontSize={{ base: 14, md: 16 }}
            fontWeight={500}
            color={color.textInfo}
          >
            {Number(itemValue).toLocaleString()}
          </Link>
        </Skeleton>
      );
    },
    [tokenCountersQuery.data, tokenCountersQuery.isPlaceholderData, changeUrlAndScroll]
  );

  throwOnResourceLoadError(tokenQuery);

  if (!isMounted) {
    return null;
  }

  const {
    exchange_rate: exchangeRate,
    total_supply: totalSupply,
    circulating_market_cap: marketCap,
    decimals,
    symbol,
    type,
  } = tokenQuery.data || {};

  let totalSupplyValue;

  if (decimals) {
    const totalValue = totalSupply
      ? getCurrencyValue({ value: totalSupply, accuracy: 3, accuracyUsd: 2, exchangeRate, decimals })
      : undefined;
    totalSupplyValue = totalValue?.valueStr;
  } else {
    totalSupplyValue = Number(totalSupply).toLocaleString();
  }

  return (
    <Grid
      columnGap={8}
      rowGap={{ base: 1, lg: 3 }}
      templateColumns={{ base: "minmax(0, 1fr)", lg: "auto minmax(728px, auto)" }}
      overflow="hidden"
    >
      {exchangeRate && (
        <>
          <DetailsInfoItem.Label
            hint="Price per token on the exchanges"
            isLoading={tokenQuery.isPlaceholderData}
            style={labelStyle}
            containerProps={{
              _notFirst: { mt: 0 },
            }}
          >
            <Text fontSize={{ base: 14, md: 16 }} {...labelStyle}>
              Price
            </Text>
          </DetailsInfoItem.Label>
          <DetailsInfoItem.Value>
            <Skeleton isLoaded={!tokenQuery.isPlaceholderData} display="inline-block">
              <span>{`$${Number(exchangeRate).toLocaleString(undefined, { minimumSignificantDigits: 4 })}`}</span>
            </Skeleton>
          </DetailsInfoItem.Value>
        </>
      )}

      {marketCap && (
        <>
          <DetailsInfoItem.Label
            hint="Total supply * Price"
            isLoading={tokenQuery.isPlaceholderData}
            style={labelStyle}
            containerProps={{
              _notFirst: { mt: 0 },
            }}
          >
            <Text fontSize={{ base: 14, md: 16 }} {...labelStyle}>
              Fully diluted market cap
            </Text>
          </DetailsInfoItem.Label>
          <DetailsInfoItem.Value>
            <Skeleton isLoaded={!tokenQuery.isPlaceholderData} display="inline-block">
              <span>{`$${BigNumber(marketCap).toFormat()}`}</span>
            </Skeleton>
          </DetailsInfoItem.Value>
        </>
      )}

      <DetailsInfoItem.Label
        hint="The total amount of tokens issued"
        isLoading={tokenQuery.isPlaceholderData}
        style={labelStyle}
        containerProps={{
          _notFirst: { mt: 0 },
        }}
      >
        <Text fontSize={{ base: 14, md: 16 }} {...labelStyle}>
          Max total supply
        </Text>
      </DetailsInfoItem.Label>
      <DetailsInfoItem.Value alignSelf="center" wordBreak="break-word" whiteSpace="pre-wrap">
        <Skeleton isLoaded={!tokenQuery.isPlaceholderData} w="100%" display="flex">
          <TruncatedValue
            value={totalSupplyValue || "0"}
            maxW="80%"
            flexShrink={0}
            fontSize={{ base: 14, md: 16 }}
            fontWeight={500}
            color={color.textPrimary}
          />
          <Box flexShrink={0}> </Box>
          <TruncatedValue
            value={symbol || ""}
            fontSize={{ base: 14, md: 16 }}
            fontWeight={500}
            color={color.textPrimary}
          />
        </Skeleton>
      </DetailsInfoItem.Value>

      <DetailsInfoItem.Label
        hint="Number of accounts holding the token"
        isLoading={tokenQuery.isPlaceholderData}
        style={labelStyle}
        containerProps={{
          _notFirst: { mt: 0 },
        }}
      >
        <Text fontSize={{ base: 14, md: 16 }} {...labelStyle}>
          Holders
        </Text>
      </DetailsInfoItem.Label>
      <DetailsInfoItem.Value fontSize={{ base: 14, md: 16 }} fontWeight={500} color={color.textPrimary}>
        <Skeleton isLoaded={!tokenCountersQuery.isPlaceholderData}>{countersItem("token_holders_count")}</Skeleton>
      </DetailsInfoItem.Value>

      <DetailsInfoItem.Label
        hint="Number of transfer for the token"
        isLoading={tokenQuery.isPlaceholderData}
        style={labelStyle}
        containerProps={{
          _notFirst: { mt: 0 },
        }}
      >
        <Text fontSize={{ base: 14, md: 16 }} {...labelStyle}>
          Transfers
        </Text>
      </DetailsInfoItem.Label>
      <DetailsInfoItem.Value fontSize={{ base: 14, md: 16 }} fontWeight={500} color={color.textPrimary}>
        <Skeleton isLoaded={!tokenCountersQuery.isPlaceholderData}>{countersItem("transfers_count")}</Skeleton>
      </DetailsInfoItem.Value>

      {decimals && (
        <>
          <DetailsInfoItem.Label
            hint="Number of digits that come after the decimal place when displaying token value"
            isLoading={tokenQuery.isPlaceholderData}
            style={labelStyle}
            containerProps={{
              _notFirst: { mt: 0 },
            }}
          >
            <Text fontSize={{ base: 14, md: 16 }} {...labelStyle}>
              Decimals
            </Text>
          </DetailsInfoItem.Label>
          <DetailsInfoItem.Value fontSize={{ base: 14, md: 16 }} fontWeight={500} color={color.textPrimary}>
            <Skeleton isLoaded={!tokenQuery.isPlaceholderData} minW={6}>
              {decimals}
            </Skeleton>
          </DetailsInfoItem.Value>
        </>
      )}

      {type !== "ERC-20" && (
        <TokenNftMarketplaces
          hash={hash}
          isLoading={tokenQuery.isPlaceholderData}
          appActionData={appActionData}
          source="NFT collection"
        />
      )}

      {type !== "ERC-20" && config.UI.views.nft.marketplaces.length === 0 && appActionData && (
        <>
          <DetailsInfoItem.Label
            hint="Link to the dapp"
            style={labelStyle}
            containerProps={{
              _notFirst: { mt: 0 },
            }}
          >
            <Text fontSize={{ base: 14, md: 16 }} {...labelStyle}>
              Dapp
            </Text>
          </DetailsInfoItem.Label>
          <DetailsInfoItem.Value py="1px" style={{ fontSize: 16, fontWeight: 500, color: color.textPrimary }}>
            <AppActionButton data={appActionData} height="30px" source="NFT collection" />
          </DetailsInfoItem.Value>
        </>
      )}
    </Grid>
  );
};

export default React.memo(TokenDetails);

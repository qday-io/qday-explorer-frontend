import { Flex, HStack, Grid, GridItem, Skeleton } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { color } from "enums/colors";
import React from "react";

import type { TokenInfo } from "types/api/token";

import config from "configs/app";
import { getTokenTypeName } from "lib/token/tokenTypes";
import AddressAddToWallet from "ui/shared/address/AddressAddToWallet";
import Tag from "ui/shared/chakra/Tag";
import AddressEntity from "ui/shared/entities/address/AddressEntity";
import TokenEntity from "ui/shared/entities/token/TokenEntity";
import ListItemMobile from "ui/shared/ListItemMobile/ListItemMobile";

type Props = {
  token: TokenInfo;
  index: number;
  page: number;
  isLoading?: boolean;
  isLastItem?: boolean;
};

const PAGE_SIZE = 50;

const bridgedTokensFeature = config.features.bridgedTokens;

const TokensTableItem = ({ token, page, index, isLoading, isLastItem }: Props) => {
  const {
    address,
    exchange_rate: exchangeRate,
    type,
    holders,
    circulating_market_cap: marketCap,
    origin_chain_id: originalChainId,
  } = token;

  const bridgedChainTag = bridgedTokensFeature.isEnabled
    ? bridgedTokensFeature.chains.find(({ id }) => id === originalChainId)?.short_title
    : undefined;

  return (
    <ListItemMobile
      rowGap={3}
      containerProps={{
        borderTopWidth: 0,
        borderBottomWidth: isLastItem ? 0 : 1,
        borderColor: isLastItem ? "transparent" : color.popupHeader,
      }}
    >
      <Grid width="100%" gridTemplateColumns="minmax(0, 1fr)">
        <GridItem display="flex">
          <TokenEntity
            token={token}
            isLoading={isLoading}
            jointSymbol
            noCopy
            w="auto"
            fontSize={14}
            fontWeight="400"
            style={{ color: color.textInfo }}
            isCustomize
            iconStyle={{
              marginRight: 8,
            }}
          />
          <Flex ml={3} flexShrink={0} columnGap={1}>
            <Tag
              isLoading={isLoading}
              childStyle={{
                backgroundColor: color.popupHeader,
                padding: "2px 8px",
                fontSize: 12,
                fontWeight: 400,
                color: color.textSecondary,
              }}
            >
              {getTokenTypeName(type)}
            </Tag>
            {bridgedChainTag && <Tag isLoading={isLoading}>{bridgedChainTag}</Tag>}
          </Flex>
          <Skeleton
            isLoaded={!isLoading}
            fontSize="sm"
            ml="auto"
            color="text_secondary"
            minW="24px"
            textAlign="right"
            lineHeight={6}
          >
            <span style={{ color: color.textTertiyari }}>{(page - 1) * PAGE_SIZE + index + 1}</span>
          </Skeleton>
        </GridItem>
      </Grid>
      <Flex justifyContent="space-between" alignItems="center" width="150px" ml={7} mt={-2}>
        <AddressEntity
          address={{ hash: address }}
          isLoading={isLoading}
          truncation="constant"
          noIcon
          fontSize={14}
          fontWeight={400}
          colorHighlight={color.textInfo}
        />
        <AddressAddToWallet token={token} isLoading={isLoading} />
      </Flex>
      {exchangeRate && (
        <HStack spacing={3}>
          <Skeleton isLoaded={!isLoading} fontSize={14} fontWeight={400} color={color.textPrimary}>
            Price
          </Skeleton>
          <Skeleton isLoaded={!isLoading} fontSize={14} fontWeight={600} color={color.textSecondary}>
            <span>${Number(exchangeRate).toLocaleString(undefined, { minimumSignificantDigits: 4 })}</span>
          </Skeleton>
        </HStack>
      )}
      {marketCap && (
        <HStack spacing={3}>
          <Skeleton isLoaded={!isLoading} fontSize={14} fontWeight={400} color={color.textPrimary}>
            On-chain market cap
          </Skeleton>
          <Skeleton isLoaded={!isLoading} fontSize={14} fontWeight={600} color={color.textSecondary}>
            <span>{BigNumber(marketCap).toFormat()}</span>
          </Skeleton>
        </HStack>
      )}
      <HStack spacing={3}>
        <Skeleton isLoaded={!isLoading} fontSize={14} fontWeight={400} color={color.textPrimary}>
          Holders
        </Skeleton>
        <Skeleton isLoaded={!isLoading} fontSize={14} fontWeight={600} color={color.textSecondary}>
          <span>{Number(holders).toLocaleString()}</span>
        </Skeleton>
      </HStack>
    </ListItemMobile>
  );
};

export default TokensTableItem;

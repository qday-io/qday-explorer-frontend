import { Flex, Td, Tr, Skeleton } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { color } from "enums/colors";
import React from "react";

import type { TokenInfo } from "types/api/token";

import config from "configs/app";
import { getTokenTypeName } from "lib/token/tokenTypes";
import AddressAddToWallet from "ui/shared/address/AddressAddToWallet";
import Tag from "ui/shared/chakra/Tag";
import type { EntityProps as AddressEntityProps } from "ui/shared/entities/address/AddressEntity";
import AddressEntity from "ui/shared/entities/address/AddressEntity";
import TokenEntity from "ui/shared/entities/token/TokenEntity";

type Props = {
  token: TokenInfo;
  index: number;
  page: number;
  isLoading?: boolean;
};

const PAGE_SIZE = 50;

const bridgedTokensFeature = config.features.bridgedTokens;

const TokensTableItem = ({ token, page, index, isLoading }: Props) => {
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

  const tokenAddress: AddressEntityProps["address"] = {
    hash: address,
    name: "",
    is_contract: true,
    is_verified: false,
    ens_domain_name: null,
    implementations: null,
  };

  return (
    <Tr
      sx={{
        '&:hover [aria-label="Add token to wallet"]': {
          opacity: 1,
        },
      }}
    >
      <Td>
        <Flex alignItems="flex-start">
          <Skeleton isLoaded={!isLoading} fontSize="sm" lineHeight="20px" fontWeight={600} mr={3} minW="28px">
            {(page - 1) * PAGE_SIZE + index + 1}
          </Skeleton>
          <Flex overflow="hidden" flexDir="column" rowGap={2}>
            <TokenEntity
              token={token}
              isLoading={isLoading}
              jointSymbol
              noCopy
              fontSize={14}
              fontWeight="600"
              style={{
                color: color.textInfo,
              }}
              isCustomize
              iconStyle={{
                marginRight: 8,
              }}
            />
            <Flex columnGap={2} py="5px" alignItems="center">
              <AddressEntity
                address={tokenAddress}
                isLoading={isLoading}
                noIcon
                fontSize={16}
                fontWeight={400}
                colorHighlight={color.textInfo}
              />
              <AddressAddToWallet token={token} isLoading={isLoading} iconSize={5} opacity={0} />
            </Flex>
            <Flex columnGap={1}>
              <Tag
                isLoading={isLoading}
                childStyle={{
                  color: color.textSecondary,
                  padding: "2px 8px",
                  backgroundColor: color.popupHeader,
                  fontSize: 12,
                  fontWeight: 400,
                }}
              >
                {getTokenTypeName(type)}
              </Tag>
              {bridgedChainTag && <Tag isLoading={isLoading}>{bridgedChainTag}</Tag>}
            </Flex>
          </Flex>
        </Flex>
      </Td>
      <Td isNumeric>
        <Skeleton isLoaded={!isLoading} fontSize={16} color={color.textSecondary} display="inline-block">
          {exchangeRate && `$${Number(exchangeRate).toLocaleString(undefined, { minimumSignificantDigits: 4 })}`}
        </Skeleton>
      </Td>
      <Td isNumeric maxWidth="300px" width="300px">
        <Skeleton isLoaded={!isLoading} fontSize={16} color={color.textSecondary} display="inline-block">
          {marketCap && `$${BigNumber(marketCap).toFormat()}`}
        </Skeleton>
      </Td>
      <Td isNumeric>
        <Skeleton isLoaded={!isLoading} fontSize={16} color={color.textSecondary} display="inline-block">
          {Number(holders).toLocaleString()}
        </Skeleton>
      </Td>
    </Tr>
  );
};

export default TokensTableItem;

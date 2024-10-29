import { Flex, Skeleton } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { TokenTransfer } from "types/api/tokenTransfer";

import getCurrencyValue from "lib/getCurrencyValue";
import { getTokenTypeName } from "lib/token/tokenTypes";
import AddressFromTo from "ui/shared/address/AddressFromTo";
import Tag from "ui/shared/chakra/Tag";
import NftEntity from "ui/shared/entities/nft/NftEntity";
import TokenEntity from "ui/shared/entities/token/TokenEntity";
import TxEntity from "ui/shared/entities/tx/TxEntity";
import ListItemMobile from "ui/shared/ListItemMobile/ListItemMobile";
import { getTokenTransferTypeText } from "ui/shared/TokenTransfer/helpers";
import TxAdditionalInfo from "ui/txs/TxAdditionalInfo";

import TimeAgoWithTooltip from "../TimeAgoWithTooltip";

type Props = TokenTransfer & {
  baseAddress?: string;
  showTxInfo?: boolean;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
};

const TokenTransferListItem = ({
  token,
  total,
  tx_hash: txHash,
  from,
  to,
  baseAddress,
  showTxInfo,
  type,
  timestamp,
  enableTimeIncrement,
  isLoading,
}: Props) => {
  const { usd, valueStr } =
    "value" in total && total.value !== null
      ? getCurrencyValue({
          value: total.value,
          exchangeRate: token.exchange_rate,
          accuracy: 8,
          accuracyUsd: 2,
          decimals: total.decimals || "0",
        })
      : { usd: null, valueStr: null };

  return (
    <ListItemMobile rowGap={3} isAnimated>
      <Flex w="100%" justifyContent="space-between">
        <Flex flexWrap="wrap" rowGap={1} mr={showTxInfo && txHash ? 2 : 0} columnGap={2} overflow="hidden">
          <TokenEntity
            token={token}
            isLoading={isLoading}
            noSymbol
            noCopy
            w="auto"
            isCustomize
            style={{ marginLeft: 8, color: color.textInfo }}
          />
          <Tag
            flexShrink={0}
            isLoading={isLoading}
            childStyle={{ fontSize: 12, fontWeight: 400, color: color.textSecondary }}
          >
            {getTokenTypeName(token.type)}
          </Tag>
          <Tag
            isLoading={isLoading}
            backgroundColor="transparent"
            borderWidth={1}
            borderColor={color.orange}
            paddingX={2}
            childStyle={{ fontSize: 12, fontWeight: 400, color: color.orange }}
          >
            {getTokenTransferTypeText(type)}
          </Tag>
        </Flex>
        {showTxInfo && txHash && <TxAdditionalInfo hash={txHash} isMobile isLoading={isLoading} />}
      </Flex>
      {"token_id" in total && total.token_id !== null && (
        <NftEntity hash={token.address} id={total.token_id} isLoading={isLoading} />
      )}
      {showTxInfo && txHash && (
        <Flex justifyContent="space-between" alignItems="center" lineHeight="24px" width="100%">
          <TxEntity isLoading={isLoading} hash={txHash} truncation="constant_long" fontWeight="700" />
          <TimeAgoWithTooltip
            timestamp={timestamp}
            enableIncrement={enableTimeIncrement}
            isLoading={isLoading}
            color="text_secondary"
            fontWeight="400"
            fontSize="sm"
          />
        </Flex>
      )}
      <AddressFromTo from={from} to={to} current={baseAddress} isLoading={isLoading} w="100%" />
      {valueStr && (
        <Flex columnGap={2} w="100%">
          <Skeleton isLoaded={!isLoading} fontWeight={600} fontSize={14} color={color.textPrimary} flexShrink={0}>
            Value
          </Skeleton>
          <Skeleton isLoaded={!isLoading} fontWeight={600} fontSize={14} color={color.textSecondary}>
            <span>{valueStr}</span>
            {usd && <span> (${usd})</span>}
          </Skeleton>
        </Flex>
      )}
    </ListItemMobile>
  );
};

export default React.memo(TokenTransferListItem);

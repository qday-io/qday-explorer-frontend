import { Grid, Flex, Skeleton } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { TokenTransfer } from "types/api/tokenTransfer";

import getCurrencyValue from "lib/getCurrencyValue";
import { NFT_TOKEN_TYPE_IDS } from "lib/token/tokenTypes";
import AddressFromTo from "ui/shared/address/AddressFromTo";
import Tag from "ui/shared/chakra/Tag";
import NftEntity from "ui/shared/entities/nft/NftEntity";
import TxEntity from "ui/shared/entities/tx/TxEntity";
import ListItemMobile from "ui/shared/ListItemMobile/ListItemMobile";
import TimeAgoWithTooltip from "ui/shared/TimeAgoWithTooltip";
import TruncatedValue from "ui/shared/TruncatedValue";

type Props = TokenTransfer & { tokenId?: string; isLoading?: boolean };

const TokenTransferListItem = ({
  token,
  total,
  tx_hash: txHash,
  from,
  to,
  method,
  timestamp,
  tokenId,
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
      <Flex justifyContent="space-between" alignItems="center" lineHeight="24px" width="100%">
        <TxEntity
          isLoading={isLoading}
          hash={txHash}
          truncation="constant_long"
          contentColor={color.textInfo}
          fontWeight={400}
          fontSize={16}
        />
      </Flex>
      {method && (
        <Tag
          isLoading={isLoading}
          backgroundColor={color.popupHeader}
          padding="2px 8px"
          fontSize={12}
          fontWeight={600}
          color={color.textSecondary}
        >
          {method}
        </Tag>
      )}
      <AddressFromTo
        from={from}
        to={to}
        isLoading={isLoading}
        tokenHash={token.address}
        w="100%"
        fontWeight={400}
        fontSize={14}
      />
      {valueStr && (token.type === "ERC-20" || token.type === "ERC-1155") && (
        <Grid gap={2} templateColumns={`1fr auto auto${usd ? " auto" : ""}`} color={color.textPrimary}>
          <Skeleton isLoaded={!isLoading} flexShrink={0} fontWeight={400} fontSize={{ base: 14, md: 16 }}>
            Value
          </Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            color={color.textSecondary}
            fontSize={{ base: 14, md: 16 }}
            fontWeight={600}
            wordBreak="break-all"
            overflow="hidden"
            flexGrow={1}
          >
            <span>{valueStr}</span>
          </Skeleton>
          {token.symbol && (
            <TruncatedValue isLoading={isLoading} value={token.symbol} fontSize={{ base: 14, md: 16 }} />
          )}
          {usd && (
            <Skeleton isLoaded={!isLoading} color="text_secondary" wordBreak="break-all" overflow="hidden">
              <span>(${usd})</span>
            </Skeleton>
          )}
        </Grid>
      )}
      {"token_id" in total && NFT_TOKEN_TYPE_IDS.includes(token.type) && total.token_id !== null && (
        <NftEntity
          hash={token.address}
          id={total.token_id}
          noLink={Boolean(tokenId && tokenId === total.token_id)}
          isLoading={isLoading}
        />
      )}
      <TimeAgoWithTooltip
        timestamp={timestamp}
        enableIncrement
        isLoading={isLoading}
        color={color.textTertiyari}
        fontWeight={400}
        fontSize={14}
        display="inline-block"
      />
    </ListItemMobile>
  );
};

export default React.memo(TokenTransferListItem);

import { Tr, Td, Flex, Skeleton, Box } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { TokenTransfer } from "types/api/tokenTransfer";

import getCurrencyValue from "lib/getCurrencyValue";
import { NFT_TOKEN_TYPE_IDS } from "lib/token/tokenTypes";
import AddressFromTo from "ui/shared/address/AddressFromTo";
import Tag from "ui/shared/chakra/Tag";
import NftEntity from "ui/shared/entities/nft/NftEntity";
import TxEntity from "ui/shared/entities/tx/TxEntity";
import TimeAgoWithTooltip from "ui/shared/TimeAgoWithTooltip";

type Props = TokenTransfer & { tokenId?: string; isLoading?: boolean; tdStyle?: React.CSSProperties };

const TokenTransferTableItem = ({
  token,
  total,
  tx_hash: txHash,
  from,
  to,
  method,
  timestamp,
  tokenId,
  isLoading,
  tdStyle,
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
    <Tr alignItems="top">
      <Td style={tdStyle}>
        <Flex alignItems="flex-start" flexDir="column" py="7px" gap={2}>
          <TxEntity
            hash={txHash}
            isLoading={isLoading}
            fontSize={16}
            fontWeight={400}
            noIcon
            truncation="constant_long"
            contentColor={color.textInfo}
          />
          <TimeAgoWithTooltip
            timestamp={timestamp}
            enableIncrement
            isLoading={isLoading}
            display="inline-block"
            fontSize={14}
            color={color.textTertiyari}
            fontWeight={400}
          />
        </Flex>
      </Td>
      <Td style={tdStyle}>
        {method ? (
          <Box my="3px">
            <Tag
              isLoading={isLoading}
              isTruncated
              padding="2px 8px"
              fontSize={14}
              fontWeight={600}
              color={color.textSecondary}
              borderRadius={4}
              backgroundColor={color.popupHeader}
            >
              {method}
            </Tag>
          </Box>
        ) : null}
      </Td>
      <Td style={tdStyle}>
        <AddressFromTo
          from={from}
          to={to}
          isLoading={isLoading}
          mt="5px"
          mode={{ lg: "compact", xl: "long" }}
          fontSize={{ base: 14, md: 16 }}
          tokenHash={token.address}
        />
      </Td>
      {NFT_TOKEN_TYPE_IDS.includes(token.type) && (
        <Td style={tdStyle}>
          {"token_id" in total && total.token_id !== null ? (
            <NftEntity
              hash={token.address}
              id={total.token_id}
              noLink={Boolean(tokenId && tokenId === total.token_id)}
              isLoading={isLoading}
            />
          ) : (
            ""
          )}
        </Td>
      )}
      {(token.type === "ERC-20" || token.type === "ERC-1155" || token.type === "ERC-404") && (
        <Td style={tdStyle} isNumeric verticalAlign="top">
          {valueStr && (
            <Skeleton
              isLoaded={!isLoading}
              display="inline-block"
              mt="7px"
              wordBreak="break-all"
              fontSize={16}
              fontWeight={400}
              color={color.textSecondary}
            >
              {valueStr}
            </Skeleton>
          )}
          {usd && (
            <Skeleton
              isLoaded={!isLoading}
              color="text_secondary"
              mt="10px"
              wordBreak="break-all"
              fontSize={16}
              fontWeight={400}
            >
              <span>${usd}</span>
            </Skeleton>
          )}
        </Td>
      )}
    </Tr>
  );
};

export default React.memo(TokenTransferTableItem);

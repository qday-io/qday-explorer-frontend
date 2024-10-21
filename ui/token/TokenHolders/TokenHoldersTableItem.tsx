import { Tr, Td, Skeleton } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { color } from "enums/colors";
import React from "react";

import type { TokenHolder, TokenInfo } from "types/api/token";

import AddressEntity from "ui/shared/entities/address/AddressEntity";
import Utilization from "ui/shared/Utilization/Utilization";

type Props = {
  holder: TokenHolder;
  token: TokenInfo;
  isLoading?: boolean;
};

const TokenTransferTableItem = ({ holder, token, isLoading }: Props) => {
  const quantity = BigNumber(holder.value)
    .div(BigNumber(10 ** Number(token.decimals)))
    .toFormat();

  return (
    <Tr>
      <Td verticalAlign="middle">
        <AddressEntity
          address={holder.address}
          isLoading={isLoading}
          flexGrow={1}
          fontWeight={400}
          fontSize={{ base: 14, md: 16 }}
          colorHighlight={color.textInfo}
        />
      </Td>
      {(token.type === "ERC-1155" || token.type === "ERC-404") && "token_id" in holder && (
        <Td verticalAlign="middle">
          <Skeleton
            isLoaded={!isLoading}
            display="inline-block"
            fontSize={{ base: 14, md: 16 }}
            fontWeight={500}
            color={color.textPrimary}
          >
            {"token_id" in holder && holder.token_id}
          </Skeleton>
        </Td>
      )}
      <Td verticalAlign="middle" isNumeric>
        <Skeleton
          isLoaded={!isLoading}
          display="inline-block"
          wordBreak="break-word"
          fontSize={{ base: 14, md: 16 }}
          fontWeight={500}
          color={color.textPrimary}
        >
          {quantity}
        </Skeleton>
      </Td>
      {token.total_supply && token.type !== "ERC-404" && (
        <Td verticalAlign="middle" isNumeric>
          <Utilization
            value={BigNumber(holder.value).div(BigNumber(token.total_supply)).dp(4).toNumber()}
            colorScheme="green"
            display="inline-flex"
            isLoading={isLoading}
            fontSize={{ base: 14, md: 16 }}
            fontWeight={500}
            progressUtilizationStyle={{ backgroundColor: color.textGreen }}
            valueUtilizationStyle={{ color: color.textGreen }}
          />
        </Td>
      )}
    </Tr>
  );
};

export default React.memo(TokenTransferTableItem);

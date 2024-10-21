import { Skeleton } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { color } from "enums/colors";
import React from "react";

import type { TokenHolder, TokenInfo } from "types/api/token";

import AddressEntity from "ui/shared/entities/address/AddressEntity";
import ListItemMobileGrid from "ui/shared/ListItemMobile/ListItemMobileGrid";
import Utilization from "ui/shared/Utilization/Utilization";

interface Props {
  holder: TokenHolder;
  token: TokenInfo;
  isLoading?: boolean;
}

const TokenHoldersListItem = ({ holder, token, isLoading }: Props) => {
  const quantity = BigNumber(holder.value)
    .div(BigNumber(10 ** Number(token.decimals)))
    .dp(6)
    .toFormat();

  return (
    <ListItemMobileGrid.Container>
      <ListItemMobileGrid.Label isLoading={isLoading} fontSize={14} fontWeight={500} color={color.textPrimary}>
        Address
      </ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value>
        <AddressEntity
          address={holder.address}
          isLoading={isLoading}
          fontWeight={400}
          fontSize={14}
          colorHighlight={color.textInfo}
          maxW="100%"
        />
      </ListItemMobileGrid.Value>

      {(token.type === "ERC-1155" || token.type === "ERC-404") && "token_id" in holder && (
        <>
          <ListItemMobileGrid.Label isLoading={isLoading} fontSize={14} fontWeight={500} color={color.textPrimary}>
            ID#
          </ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>
            <Skeleton isLoaded={!isLoading} display="inline-block">
              {holder.token_id}
            </Skeleton>
          </ListItemMobileGrid.Value>
        </>
      )}

      <ListItemMobileGrid.Label isLoading={isLoading} fontSize={14} fontWeight={500} color={color.textPrimary}>
        Quantity
      </ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value fontSize={14} fontWeight={500} color={color.textSecondary}>
        <Skeleton isLoaded={!isLoading} display="inline-block">
          {quantity}
        </Skeleton>
      </ListItemMobileGrid.Value>

      {token.total_supply && token.type !== "ERC-404" && (
        <>
          <ListItemMobileGrid.Label isLoading={isLoading} fontSize={14} fontWeight={500} color={color.textPrimary}>
            Percentage
          </ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value>
            <Utilization
              value={BigNumber(holder.value).div(BigNumber(token.total_supply)).dp(4).toNumber()}
              colorScheme="green"
              isLoading={isLoading}
              display="inline-flex"
              progressUtilizationStyle={{ backgroundColor: color.textGreen }}
              valueUtilizationStyle={{ color: color.textGreen, fontSize: 14, fontWeight: 500 }}
            />
          </ListItemMobileGrid.Value>
        </>
      )}
    </ListItemMobileGrid.Container>
  );
};

export default TokenHoldersListItem;

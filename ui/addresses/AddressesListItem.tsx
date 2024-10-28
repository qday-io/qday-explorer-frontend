import { Flex, HStack, Skeleton } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { color } from "enums/colors";
import React from "react";

import type { AddressesItem } from "types/api/addresses";

import config from "configs/app";
import { ZERO } from "lib/consts";
import { currencyUnits } from "lib/units";
import Tag from "ui/shared/chakra/Tag";
import AddressEntity from "ui/shared/entities/address/AddressEntity";
import ListItemMobile from "ui/shared/ListItemMobile/ListItemMobile";

type Props = {
  item: AddressesItem;
  index: number;
  totalSupply: BigNumber;
  isLoading?: boolean;
};

const AddressesListItem = ({ item, index, totalSupply, isLoading }: Props) => {
  const addressBalance = BigNumber(item.coin_balance).div(BigNumber(10 ** config.chain.currency.decimals));

  const labelStyle = {
    fontSize: 14,
    fontWeight: 600,
    color: color.textPrimary,
  };

  return (
    <ListItemMobile rowGap={3}>
      <Skeleton isLoaded={!isLoading} minW={6} fontSize={14} fontWeight={400} color={color.textSecondary}>
        <span>{index}</span>
      </Skeleton>
      <Flex alignItems="center" justifyContent="space-between" w="100%">
        <AddressEntity
          address={item}
          isLoading={isLoading}
          fontWeight={600}
          colorHighlight={color.textInfo}
          fontSize={14}
          mr={2}
          truncation="constant"
        />
      </Flex>
      {item.public_tags !== null &&
        item.public_tags.length > 0 &&
        item.public_tags.map((tag) => (
          <Tag key={tag.label} isLoading={isLoading}>
            {tag.display_name}
          </Tag>
        ))}
      <HStack spacing={3} maxW="100%" alignItems="flex-start">
        <Skeleton isLoaded={!isLoading} flexShrink={0} {...labelStyle}>{`Balance ${currencyUnits.ether}`}</Skeleton>
        <Skeleton
          isLoaded={!isLoading}
          fontSize={14}
          fontWeight={400}
          color={color.textSecondary}
          minW="0"
          whiteSpace="pre-wrap"
        >
          <span>{addressBalance.dp(8).toFormat()}</span>
        </Skeleton>
      </HStack>
      {!totalSupply.eq(ZERO) && (
        <HStack spacing={3}>
          <Skeleton isLoaded={!isLoading} {...labelStyle}>
            Percentage
          </Skeleton>
          <Skeleton isLoaded={!isLoading} fontSize={14} fontWeight={400} color={color.textSecondary}>
            <span>{addressBalance.div(BigNumber(totalSupply)).multipliedBy(100).dp(8).toFormat() + "%"}</span>
          </Skeleton>
        </HStack>
      )}
      <HStack spacing={3}>
        <Skeleton isLoaded={!isLoading} {...labelStyle}>
          Txn count
        </Skeleton>
        <Skeleton isLoaded={!isLoading} fontSize={14} fontWeight={400} color={color.textSecondary}>
          <span>{Number(item.tx_count).toLocaleString()}</span>
        </Skeleton>
      </HStack>
    </ListItemMobile>
  );
};

export default React.memo(AddressesListItem);

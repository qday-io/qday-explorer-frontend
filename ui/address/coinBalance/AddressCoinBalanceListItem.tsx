import { Text, Stat, StatHelpText, StatArrow, Flex, Skeleton } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { color } from "enums/colors";
import React from "react";

import type { AddressCoinBalanceHistoryItem } from "types/api/address";

import { WEI, ZERO } from "lib/consts";
import { currencyUnits } from "lib/units";
import BlockEntity from "ui/shared/entities/block/BlockEntity";
import TxEntity from "ui/shared/entities/tx/TxEntity";
import ListItemMobile from "ui/shared/ListItemMobile/ListItemMobile";
import TimeAgoWithTooltip from "ui/shared/TimeAgoWithTooltip";

type Props = AddressCoinBalanceHistoryItem & {
  page: number;
  isLoading: boolean;
};

const AddressCoinBalanceListItem = (props: Props) => {
  const deltaBn = BigNumber(props.delta).div(WEI);
  const isPositiveDelta = deltaBn.gte(ZERO);

  const labelProps = {
    minW: "80px",
    fontSize: 14,
    fontWeight: 600,
    color: color.textPrimary,
  };

  return (
    <ListItemMobile rowGap={2} isAnimated>
      <Flex justifyContent="space-between" w="100%">
        <Skeleton isLoaded={!props.isLoading} fontWeight={600} fontSize={14} color={color.textPrimary}>
          {BigNumber(props.value).div(WEI).dp(8).toFormat()} {currencyUnits.ether}
        </Skeleton>
        <Skeleton isLoaded={!props.isLoading}>
          <Stat flexGrow="0">
            <StatHelpText display="flex" mb={0} alignItems="center">
              <StatArrow type={isPositiveDelta ? "increase" : "decrease"} mr={2} />
              <Text as="span" color={isPositiveDelta ? color.textGreen : color.textRed} fontWeight={600} fontSize={14}>
                {deltaBn.dp(8).toFormat()}
              </Text>
            </StatHelpText>
          </Stat>
        </Skeleton>
      </Flex>
      <Flex columnGap={2} w="100%">
        <Skeleton isLoaded={!props.isLoading} flexShrink={0} {...labelProps}>
          Block
        </Skeleton>
        <BlockEntity
          isLoading={props.isLoading}
          number={props.block_number}
          noIcon
          fontWeight={400}
          fontSize={14}
          colorHighLight={color.textInfo}
        />
      </Flex>
      {props.transaction_hash && (
        <Flex columnGap={2} w="100%">
          <Skeleton isLoaded={!props.isLoading} flexShrink={0} {...labelProps}>
            Txs
          </Skeleton>
          <TxEntity
            hash={props.transaction_hash}
            isLoading={props.isLoading}
            noIcon
            maxW="150px"
            fontWeight={400}
            fontSize={14}
            contentColor={color.textInfo}
          />
        </Flex>
      )}
      <Flex columnGap={2} w="100%">
        <Skeleton isLoaded={!props.isLoading} flexShrink={0} {...labelProps}>
          Age
        </Skeleton>
        <TimeAgoWithTooltip
          timestamp={props.block_timestamp}
          enableIncrement={props.page === 1}
          isLoading={props.isLoading}
          contentProps={{
            fontWeight: 400,
            fontSize: 14,
            color: color.textSecondary,
          }}
        />
      </Flex>
    </ListItemMobile>
  );
};

export default React.memo(AddressCoinBalanceListItem);

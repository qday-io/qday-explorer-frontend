import { Td, Tr, Text, Stat, StatHelpText, StatArrow, Skeleton } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { color } from "enums/colors";
import React from "react";

import type { AddressCoinBalanceHistoryItem } from "types/api/address";

import { WEI, ZERO } from "lib/consts";
import BlockEntity from "ui/shared/entities/block/BlockEntity";
import TxEntity from "ui/shared/entities/tx/TxEntity";
import TimeAgoWithTooltip from "ui/shared/TimeAgoWithTooltip";

type Props = AddressCoinBalanceHistoryItem & {
  page: number;
  isLoading: boolean;
};

const AddressCoinBalanceTableItem = (props: Props) => {
  const deltaBn = BigNumber(props.delta).div(WEI);
  const isPositiveDelta = deltaBn.gte(ZERO);

  return (
    <Tr>
      <Td paddingLeft={4}>
        <BlockEntity
          isLoading={props.isLoading}
          number={props.block_number}
          noIcon
          fontSize={16}
          lineHeight={5}
          fontWeight={400}
          colorHighLight={color.textInfo}
        />
      </Td>
      <Td>
        {props.transaction_hash && (
          <TxEntity
            hash={props.transaction_hash}
            isLoading={props.isLoading}
            noIcon
            fontWeight={400}
            fontSize={16}
            contentColor={color.textInfo}
            maxW="150px"
          />
        )}
      </Td>
      <Td>
        <TimeAgoWithTooltip
          timestamp={props.block_timestamp}
          enableIncrement={props.page === 1}
          isLoading={props.isLoading}
          color="text_secondary"
          display="inline-block"
          contentProps={{ fontWeight: 400, fontSize: 16, color: color.textSecondary }}
        />
      </Td>
      <Td isNumeric pr={1} style={{ textAlign: "left" }}>
        <Skeleton
          isLoaded={!props.isLoading}
          color={color.textSecondary}
          fontSize={16}
          fontWeight={400}
          display="inline-block"
        >
          <span>{BigNumber(props.value).div(WEI).dp(8).toFormat()}</span>
        </Skeleton>
      </Td>
      <Td isNumeric display="flex" justifyContent="start">
        <Skeleton isLoaded={!props.isLoading}>
          <Stat flexGrow="0" lineHeight={5}>
            <StatHelpText display="flex" mb={0} alignItems="center">
              <StatArrow type={isPositiveDelta ? "increase" : "decrease"} mr={2} />
              <Text as="span" color={isPositiveDelta ? color.textGreen : color.textRed} fontWeight={600}>
                {deltaBn.dp(8).toFormat()}
              </Text>
            </StatHelpText>
          </Stat>
        </Skeleton>
      </Td>
    </Tr>
  );
};

export default React.memo(AddressCoinBalanceTableItem);

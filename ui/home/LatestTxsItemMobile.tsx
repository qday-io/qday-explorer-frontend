import { Box, Flex, HStack, Text, Skeleton } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { Transaction } from "types/api/transaction";

import config from "configs/app";
import getValueWithUnit from "lib/getValueWithUnit";
import { currencyUnits } from "lib/units";
import AddressFromTo from "ui/shared/address/AddressFromTo";
import TxEntity from "ui/shared/entities/tx/TxEntity";
import TxStatus from "ui/shared/statusTag/TxStatus";
import TimeAgoWithTooltip from "ui/shared/TimeAgoWithTooltip";
import TxFee from "ui/shared/tx/TxFee";
import TxWatchListTags from "ui/shared/tx/TxWatchListTags";
import TxAdditionalInfo from "ui/txs/TxAdditionalInfo";
import TxType from "ui/txs/TxType";

type Props = {
  tx: Transaction;
  isLoading?: boolean;
};

const LatestTxsItem = ({ tx, isLoading }: Props) => {
  const dataTo = tx.to ? tx.to : tx.created_contract;

  return (
    <Box
      width="100%"
      borderTop="1px solid"
      borderColor="divider"
      py={4}
      _last={{ borderBottom: "1px solid", borderColor: "divider" }}
      display={{ base: "block", lg: "none" }}
    >
      <Flex justifyContent="space-between">
        <HStack flexWrap="wrap">
          <TxType types={tx.tx_types} isLoading={isLoading} />
          <TxStatus
            status={tx.status}
            errorText={tx.status === "error" ? tx.result : undefined}
            isLoading={isLoading}
          />
          <TxWatchListTags tx={tx} isLoading={isLoading} />
        </HStack>
        <TxAdditionalInfo tx={tx} isMobile isLoading={isLoading} />
      </Flex>
      <Flex mt={2} alignItems="center" width="100%" justifyContent="space-between" mb={6}>
        <TxEntity
          isLoading={isLoading}
          hash={tx.hash}
          fontSize={16}
          lineHeight={6}
          fontWeight={400}
          contentColor={color.textInfo}
          truncation="constant_long"
        />
      </Flex>
      <AddressFromTo
        from={tx.from}
        to={dataTo}
        color={color.textInfo}
        isLoading={isLoading}
        fontSize="sm"
        fontWeight="500"
        mb={3}
      />
      {!config.UI.views.tx.hiddenFields?.value && (
        <Skeleton isLoaded={!isLoading} mb={2} fontSize="sm" w="fit-content">
          <Text as="span" color={color.textPrimary} fontWeight={400}>
            Value:{" "}
          </Text>
          <Text as="span" variant="secondary" color={color.textPrimary} fontWeight={700}>
            {getValueWithUnit(tx.value).dp(5).toFormat()} {currencyUnits.ether}
          </Text>
        </Skeleton>
      )}
      {!config.UI.views.tx.hiddenFields?.tx_fee && (
        <Skeleton isLoaded={!isLoading} fontSize="sm" w="fit-content" display="flex" whiteSpace="pre">
          <Text as="span" color={color.textPrimary}>
            Fee:{" "}
          </Text>
          <TxFee tx={tx} accuracy={5} color={color.textPrimary} fontWeight={700} />
        </Skeleton>
      )}
      <TimeAgoWithTooltip
        timestamp={tx.timestamp}
        enableIncrement
        isLoading={isLoading}
        color={color.textTertiyari}
        fontWeight="400"
        fontSize="sm"
        mt={2}
      />
    </Box>
  );
};

export default React.memo(LatestTxsItem);

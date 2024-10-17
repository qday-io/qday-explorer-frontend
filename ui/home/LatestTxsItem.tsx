import { Box, Flex, HStack, Text, Grid, Skeleton } from "@chakra-ui/react";
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
import TxWatchListTags from "ui/shared/tx/TxWatchListTags";
import TxAdditionalInfo from "ui/txs/TxAdditionalInfo";
import TxType from "ui/txs/TxType";

type Props = {
  tx: Transaction;
  isLoading?: boolean;
};

const LatestTxsItem = ({ tx, isLoading }: Props) => {
  const dataTo = tx.to ? tx.to : tx.created_contract;
  const columnNum = config.UI.views.tx.hiddenFields?.value && config.UI.views.tx.hiddenFields?.tx_fee ? 2 : 3;

  return (
    <Grid
      gridTemplateColumns={{
        lg: columnNum === 2 ? "3fr minmax(auto, 180px)" : "1fr 30% 28%",
        xl: columnNum === 2 ? "3fr minmax(auto, 250px)" : "1fr 25% 20%",
      }}
      gridGap={10}
      width="100%"
      borderTop="1px solid"
      borderColor="divider"
      p={4}
      _last={{ borderBottom: "1px solid", borderColor: "divider" }}
      display={{ base: "none", lg: "grid" }}
    >
      <Flex overflow="hidden" w="100%" alignItems="center">
        <TxAdditionalInfo tx={tx} isLoading={isLoading} my="3px" />
        <Box ml={3} w="calc(100% - 40px)">
          <HStack flexWrap="wrap" my="3px">
            <TxWatchListTags tx={tx} isLoading={isLoading} />
          </HStack>
          <Flex height="100%" flexDirection="column" justifyContent="space-between" gap={2}>
            <TxEntity
              isLoading={isLoading}
              hash={tx.hash}
              fontWeight="400"
              fontSize={16}
              lineHeight={6}
              hasIcon={false}
              contentColor={color.textInfo}
            />
            <TimeAgoWithTooltip
              timestamp={tx.timestamp}
              enableIncrement
              isLoading={isLoading}
              color={color.textTertiyari}
              fontWeight="400"
              fontSize={14}
              flexShrink={0}
            />
          </Flex>
        </Box>
      </Flex>
      <AddressFromTo from={tx.from} to={dataTo} isLoading={isLoading} mode="compact" />

      <Flex flexDir="column" alignItems="flex-end" gap={1}>
        <Box>
          <Flex>
            {!config.UI.views.tx.hiddenFields?.value && (
              <Skeleton isLoaded={!isLoading}>
                <Text
                  as="span"
                  variant="secondary"
                  fontSize={14}
                  lineHeight={5}
                  color={color.textPrimary}
                  fontWeight={700}
                >
                  {getValueWithUnit(tx.value).dp(5).toFormat()} {currencyUnits.ether}
                </Text>
              </Skeleton>
            )}
          </Flex>
        </Box>
        <Box>
          <Flex gap={2}>
            <TxType types={tx.tx_types} isLoading={isLoading} minW="120px" />
            <TxStatus
              height="100%"
              status={tx.status}
              errorText={tx.status === "error" ? tx.result : undefined}
              isLoading={isLoading}
            />
          </Flex>
        </Box>
      </Flex>
    </Grid>
  );
};

export default React.memo(LatestTxsItem);

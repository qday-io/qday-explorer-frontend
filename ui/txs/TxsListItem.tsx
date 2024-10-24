import { HStack, Flex, Skeleton } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { Transaction } from "types/api/transaction";

import config from "configs/app";
import getValueWithUnit from "lib/getValueWithUnit";
import { space } from "lib/html-entities";
import { currencyUnits } from "lib/units";
import AddressFromTo from "ui/shared/address/AddressFromTo";
import BlockEntity from "ui/shared/entities/block/BlockEntity";
import TxEntity from "ui/shared/entities/tx/TxEntity";
import ListItemMobile from "ui/shared/ListItemMobile/ListItemMobile";
import TxStatus from "ui/shared/statusTag/TxStatus";
import TimeAgoWithTooltip from "ui/shared/TimeAgoWithTooltip";
import TxFee from "ui/shared/tx/TxFee";
import TxWatchListTags from "ui/shared/tx/TxWatchListTags";
import TxAdditionalInfo from "ui/txs/TxAdditionalInfo";
import TxType from "ui/txs/TxType";

import TxTranslationType from "./TxTranslationType";

type Props = {
  tx: Transaction;
  showBlockInfo: boolean;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
};

const TxsListItem = ({ tx, isLoading, showBlockInfo, currentAddress, enableTimeIncrement }: Props) => {
  const dataTo = tx.to ? tx.to : tx.created_contract;

  return (
    <ListItemMobile display="block" width="100%" isAnimated key={tx.hash}>
      <Flex justifyContent="space-between" mt={4}>
        <HStack flexWrap="wrap">
          {tx.translation ? (
            <TxTranslationType
              types={tx.tx_types}
              isLoading={isLoading || tx.translation.isLoading}
              translatationType={tx.translation.data?.type}
            />
          ) : (
            <TxType types={tx.tx_types} isLoading={isLoading} />
          )}
          <TxStatus
            status={tx.status}
            errorText={tx.status === "error" ? tx.result : undefined}
            isLoading={isLoading}
          />
          <TxWatchListTags tx={tx} isLoading={isLoading} />
        </HStack>
        <TxAdditionalInfo tx={tx} isMobile isLoading={isLoading} />
      </Flex>
      <Flex justifyContent="space-between" lineHeight="24px" mt={3} alignItems="center">
        <TxEntity
          isLoading={isLoading}
          hash={tx.hash}
          truncation="constant_long"
          iconName={tx.tx_types.includes("blob_transaction") ? "blob" : undefined}
          fontWeight={400}
          contentColor={color.textInfo}
          fontSize={16}
        />
      </Flex>
      {tx.method && (
        <Flex mt={3}>
          <Skeleton
            isLoaded={!isLoading}
            display="inline-block"
            whiteSpace="pre"
            fontSize={14}
            fontWeight={400}
            color={color.textPrimary}
          >
            Method{" "}
          </Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            fontSize={14}
            fontWeight={600}
            color={color.textSecondary}
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
          >
            <span>{tx.method}</span>
          </Skeleton>
        </Flex>
      )}
      {showBlockInfo && tx.block !== null && (
        <Flex mt={2}>
          <Skeleton isLoaded={!isLoading} display="inline-block" whiteSpace="pre">
            Block{" "}
          </Skeleton>
          <BlockEntity isLoading={isLoading} number={tx.block} noIcon />
        </Flex>
      )}
      <AddressFromTo
        from={tx.from}
        to={dataTo}
        current={currentAddress}
        isLoading={isLoading}
        mt={6}
        fontWeight={400}
        fontSize={14}
      />
      {!config.UI.views.tx.hiddenFields?.value && (
        <Flex mt={2} columnGap={2}>
          <Skeleton
            isLoaded={!isLoading}
            display="inline-block"
            whiteSpace="pre"
            fontSize={14}
            fontWeight={400}
            color={color.textPrimary}
          >
            Value
          </Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            display="inline-block"
            variant="text_secondary"
            whiteSpace="pre"
            fontSize={14}
            fontWeight={600}
            color={color.textSecondary}
          >
            {getValueWithUnit(tx.value).toFormat()}
            {space}
            {currencyUnits.ether}
          </Skeleton>
        </Flex>
      )}
      {!config.UI.views.tx.hiddenFields?.tx_fee && (
        <Flex mt={2} mb={3} columnGap={2}>
          {(tx.stability_fee !== undefined || tx.fee.value !== null) && (
            <>
              <Skeleton
                isLoaded={!isLoading}
                display="inline-block"
                whiteSpace="pre"
                fontSize={14}
                fontWeight={400}
                color={color.textPrimary}
              >
                Fee
              </Skeleton>
              <TxFee tx={tx} isLoading={isLoading} fontSize={14} fontWeight={600} color={color.textSecondary} />
            </>
          )}
        </Flex>
      )}
      <TimeAgoWithTooltip
        timestamp={tx.timestamp}
        enableIncrement={enableTimeIncrement}
        isLoading={isLoading}
        color={color.textTertiyari}
        fontWeight={400}
        fontSize={14}
      />
    </ListItemMobile>
  );
};

export default React.memo(TxsListItem);

import { Tr, Td, VStack, Box } from "@chakra-ui/react";
import { color } from "enums/colors";
import { motion } from "framer-motion";
import React from "react";

import type { Transaction } from "types/api/transaction";

import config from "configs/app";
import AddressFromTo from "ui/shared/address/AddressFromTo";
import Tag from "ui/shared/chakra/Tag";
import CurrencyValue from "ui/shared/CurrencyValue";
import BlockEntity from "ui/shared/entities/block/BlockEntity";
import TxEntity from "ui/shared/entities/tx/TxEntity";
import TxStatus from "ui/shared/statusTag/TxStatus";
import TimeAgoWithTooltip from "ui/shared/TimeAgoWithTooltip";
import TxFee from "ui/shared/tx/TxFee";
import TxWatchListTags from "ui/shared/tx/TxWatchListTags";
import TxAdditionalInfo from "ui/txs/TxAdditionalInfo";

import TxTranslationType from "./TxTranslationType";
import TxType from "./TxType";

type Props = {
  tx: Transaction;
  showBlockInfo: boolean;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
};

const TxsTableItem = ({ tx, showBlockInfo, currentAddress, enableTimeIncrement, isLoading }: Props) => {
  const dataTo = tx.to ? tx.to : tx.created_contract;

  const tdStyle = {
    padding: "12px 16px 4px 16px",
  };

  return (
    <Tr
      as={motion.tr}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      key={tx.hash}
    >
      <Td {...tdStyle} position="relative">
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          <TxAdditionalInfo tx={tx} isLoading={isLoading} />
        </Box>
      </Td>
      <Td {...tdStyle}>
        <VStack alignItems="start" lineHeight="24px">
          <TxEntity
            hash={tx.hash}
            isLoading={isLoading}
            noIcon
            maxW="100%"
            truncation="constant_long"
            fontWeight={400}
            fontSize={16}
            contentColor={color.textInfo}
          />
          <TimeAgoWithTooltip
            timestamp={tx.timestamp}
            enableIncrement={enableTimeIncrement}
            isLoading={isLoading}
            color={color.textTertiyari}
            fontSize={14}
            fontWeight={400}
          />
        </VStack>
      </Td>
      <Td {...tdStyle}>
        <VStack alignItems="start">
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
        </VStack>
      </Td>
      <Td whiteSpace="nowrap" {...tdStyle}>
        {tx.method && (
          <Tag
            colorScheme={tx.method === "Multicall" ? "teal" : "gray"}
            isLoading={isLoading}
            isTruncated
            fontSize={12}
            fontWeight={400}
            color={color.textSecondary}
            paddingX={2}
            backgroundColor="transparent"
            borderWidth={1}
            borderRadius={4}
            borderColor={color.textBlack}
          >
            {tx.method}
          </Tag>
        )}
      </Td>
      {showBlockInfo && (
        <Td {...tdStyle}>
          {tx.block && (
            <BlockEntity
              isLoading={isLoading}
              number={tx.block}
              noIcon
              fontSize={16}
              lineHeight={6}
              fontWeight={400}
              colorHighLight={color.textInfo}
            />
          )}
        </Td>
      )}
      <Td {...tdStyle}>
        <AddressFromTo
          from={tx.from}
          to={dataTo}
          current={currentAddress}
          isLoading={isLoading}
          mt="2px"
          mode="compact"
          fontWeight={400}
          fontSize={16}
        />
      </Td>
      {!config.UI.views.tx.hiddenFields?.value && (
        <Td isNumeric {...tdStyle}>
          <CurrencyValue
            value={tx.value}
            accuracy={8}
            isLoading={isLoading}
            fontSize={16}
            fontWeight={400}
            color={color.textSecondary}
          />
        </Td>
      )}
      {!config.UI.views.tx.hiddenFields?.tx_fee && (
        <Td isNumeric {...tdStyle}>
          <TxFee
            tx={tx}
            accuracy={8}
            isLoading={isLoading}
            withCurrency={Boolean(tx.celo || tx.stability_fee)}
            justifyContent="end"
          />
        </Td>
      )}
    </Tr>
  );
};

export default React.memo(TxsTableItem);

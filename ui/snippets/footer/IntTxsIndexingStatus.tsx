import { PopoverTrigger, PopoverContent, PopoverBody, Flex, Text } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import SvgInformation from "assets/icons/SvgInformation";
import { color } from "enums/colors";
import React from "react";

import type { SocketMessage } from "lib/socket/types";
import type { IndexingStatus } from "types/api/indexingStatus";

import useApiQuery, { getResourceKey } from "lib/api/useApiQuery";
import { apos, nbsp, ndash } from "lib/html-entities";
import useSocketChannel from "lib/socket/useSocketChannel";
import useSocketMessage from "lib/socket/useSocketMessage";
import Popover from "ui/shared/chakra/Popover";

const IntTxsIndexingStatus = () => {
  const { data, isError, isPending } = useApiQuery("homepage_indexing_status");

  const queryClient = useQueryClient();

  const handleInternalTxsIndexStatus: SocketMessage.InternalTxsIndexStatus["handler"] = React.useCallback(
    (payload) => {
      queryClient.setQueryData(getResourceKey("homepage_indexing_status"), (prevData: IndexingStatus | undefined) => {
        const newData = prevData ? { ...prevData } : ({} as IndexingStatus);
        newData.finished_indexing = payload.finished;
        newData.indexed_internal_transactions_ratio = payload.ratio;

        return newData;
      });
    },
    [queryClient]
  );

  const internalTxsIndexingChannel = useSocketChannel({
    topic: "blocks:indexing_internal_transactions",
    isDisabled: !data || data.finished_indexing,
  });

  useSocketMessage({
    channel: internalTxsIndexingChannel,
    event: "internal_txs_index_status",
    handler: handleInternalTxsIndexStatus,
  });

  if (isError || isPending) {
    return null;
  }

  if (data.finished_indexing !== false) {
    return null;
  }

  const hint = (
    <Text fontSize={12} lineHeight={5} fontWeight={400} color={color.textPrimary}>
      {data.indexed_internal_transactions_ratio &&
        `${Math.floor(Number(data.indexed_internal_transactions_ratio) * 100)}% Blocks With Internal Transactions Indexed${nbsp}${ndash} `}
      We{apos}re indexing this chain right now. Some of the counts may be inaccurate.
    </Text>
  );

  const trigger = (
    <Flex
      px={2}
      py={1}
      borderRadius={6}
      alignItems="center"
      justifyContent="center"
      gap={1}
      color={color.textGreen}
      backgroundColor={color.opacityGreen}
      _hover={{ cursor: "pointer" }}
    >
      <SvgInformation fill={color.textGreen} />
      {data.indexed_internal_transactions_ratio && (
        <Text fontWeight={600} fontSize="xs" color="inherit">
          {Math.floor(Number(data.indexed_internal_transactions_ratio) * 100) + "%"}
        </Text>
      )}
    </Flex>
  );

  return (
    <Popover placement="bottom-start" isLazy trigger="hover">
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent maxH="450px" overflowY="hidden" minWidth="340px">
        <PopoverBody p={4} boxShadow="2xl" backgroundColor={color.fillBackgroundBlack}>
          {hint}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default IntTxsIndexingStatus;

import { Box, Flex } from "@chakra-ui/react";
import { color } from "enums/colors";
import { useRouter } from "next/router";
import React from "react";

import type { SocketMessage } from "lib/socket/types";
import type { TokenInfo } from "types/api/token";

import useGradualIncrement from "lib/hooks/useGradualIncrement";
import useIsMounted from "lib/hooks/useIsMounted";
import useSocketChannel from "lib/socket/useSocketChannel";
import useSocketMessage from "lib/socket/useSocketMessage";
import DataListDisplay from "ui/shared/DataListDisplay";
import Pagination from "ui/shared/pagination/Pagination";
import type { QueryWithPagesResult } from "ui/shared/pagination/useQueryWithPages";
import * as SocketNewItemsNotice from "ui/shared/SocketNewItemsNotice";
import TokenTransferList from "ui/token/TokenTransfer/TokenTransferList";
import TokenTransferTable from "ui/token/TokenTransfer/TokenTransferTable";

const TABS_HEIGHT = 88;

type Props = {
  transfersQuery: QueryWithPagesResult<"token_transfers"> | QueryWithPagesResult<"token_instance_transfers">;
  tokenId?: string;
  token?: TokenInfo;
  shouldRender?: boolean;
};

const TokenTransfer = ({ transfersQuery, tokenId, token, shouldRender = true }: Props) => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const { isError, isPlaceholderData, data, pagination } = transfersQuery;

  const [newItemsCount, setNewItemsCount] = useGradualIncrement(0);
  const [socketAlert, setSocketAlert] = React.useState("");

  const handleNewTransfersMessage: SocketMessage.TokenTransfers["handler"] = (payload) => {
    setNewItemsCount(payload.token_transfer);
  };

  const handleSocketClose = React.useCallback(() => {
    setSocketAlert("Connection is lost. Please refresh the page to load new token transfers.");
  }, []);

  const handleSocketError = React.useCallback(() => {
    setSocketAlert("An error has occurred while fetching new token transfers. Please refresh the page.");
  }, []);

  const channel = useSocketChannel({
    topic: `tokens:${router.query.hash?.toString().toLowerCase()}`,
    onSocketClose: handleSocketClose,
    onSocketError: handleSocketError,
    isDisabled: isPlaceholderData || isError || pagination.page !== 1,
  });
  useSocketMessage({
    channel,
    event: "token_transfer",
    handler: handleNewTransfersMessage,
  });

  if (!isMounted || !shouldRender) {
    return null;
  }

  const content = data?.items ? (
    <>
      <Box display={{ base: "none", lg: "block" }}>
        <TokenTransferTable
          data={data?.items}
          top={pagination.isVisible ? TABS_HEIGHT : 0}
          showSocketInfo={pagination.page === 1}
          socketInfoAlert={socketAlert}
          socketInfoNum={newItemsCount}
          tokenId={tokenId}
          token={token}
          isLoading={isPlaceholderData}
        />
        <Flex marginTop={6} justifyContent="flex-end">
          {pagination?.isVisible && <Pagination {...pagination} />}
        </Flex>
      </Box>
      <Box display={{ base: "block", lg: "none" }}>
        {pagination.page === 1 && (
          <Flex justifyContent="flex-end">
            <SocketNewItemsNotice.Mobile
              url={window.location.href}
              num={newItemsCount}
              alert={socketAlert}
              type="token_transfer"
              isLoading={isPlaceholderData}
              style={{
                backgroundColor: "transparent",
                color: color.textTertiyari,
                width: "fit-content",
              }}
            />
          </Flex>
        )}
        <TokenTransferList data={data?.items} tokenId={tokenId} isLoading={isPlaceholderData} />
        <Flex justifyContent="flex-end" marginTop={3}>
          {pagination?.isVisible && <Pagination {...pagination} />}
        </Flex>
      </Box>
    </>
  ) : null;

  return (
    <DataListDisplay
      isError={isError}
      items={data?.items}
      emptyText="There are no token transfers."
      content={content}
    />
  );
};

export default React.memo(TokenTransfer);

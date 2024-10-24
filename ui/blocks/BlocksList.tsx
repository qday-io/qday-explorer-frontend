import { Box } from "@chakra-ui/react";
import { color } from "enums/colors";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import type { Block } from "types/api/block";

import useIsMobile from "lib/hooks/useIsMobile";
import BlocksListItem from "ui/blocks/BlocksListItem";
import type { QueryWithPagesResult } from "ui/shared/pagination/useQueryWithPages";
import * as SocketNewItemsNotice from "ui/shared/SocketNewItemsNotice";

interface Props {
  data: Array<Block>;
  isLoading: boolean;
  page: number;
  showSocketInfo?: boolean;
  newItemsCount?: number;
  socketAlert?: string;
  query?: QueryWithPagesResult<"blocks">;
}

const BlocksList = ({ data, isLoading, page, showSocketInfo, newItemsCount, socketAlert, query }: Props) => {
  const [socketContainer, setSocketContainer] = useState<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const renderSocket = useMemo(() => {
    if (socketContainer && showSocketInfo && isMobile) {
      return createPortal(
        <SocketNewItemsNotice.Mobile
          url={window.location.href}
          num={newItemsCount}
          alert={socketAlert}
          type="block"
          isLoading={query && query.isPlaceholderData}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: color.textBlack,
          }}
        />,
        socketContainer
      );
    }
  }, [isMobile, newItemsCount, query, showSocketInfo, socketAlert, socketContainer]);

  useEffect(() => {
    setSocketContainer(document.getElementById("blocks-tab-socket"));
  }, []);

  return (
    <Box>
      <AnimatePresence initial={false}>
        {data.map((item, index) => (
          <BlocksListItem
            key={item.height + (isLoading ? String(index) : "")}
            data={item}
            isLoading={isLoading}
            enableTimeIncrement={page === 1 && !isLoading}
          />
        ))}
      </AnimatePresence>
      {renderSocket}
    </Box>
  );
};

export default BlocksList;

import { Table, Tbody, Tr, Th } from "@chakra-ui/react";
import { color } from "enums/colors";
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import type { TokenInfo } from "types/api/token";
import type { TokenTransfer } from "types/api/tokenTransfer";

import { AddressHighlightProvider } from "lib/contexts/addressHighlight";
import { NFT_TOKEN_TYPE_IDS } from "lib/token/tokenTypes";
import * as SocketNewItemsNotice from "ui/shared/SocketNewItemsNotice";
import { default as Thead } from "ui/shared/TheadSticky";
import TruncatedValue from "ui/shared/TruncatedValue";
import TokenTransferTableItem from "ui/token/TokenTransfer/TokenTransferTableItem";

interface Props {
  data: Array<TokenTransfer>;
  top: number;
  showSocketInfo: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  tokenId?: string;
  isLoading?: boolean;
  token?: TokenInfo;
  thStyle?: React.CSSProperties;
}

const TokenTransferTable = ({
  data,
  top,
  showSocketInfo,
  socketInfoAlert,
  socketInfoNum,
  tokenId,
  isLoading,
  token,
}: Props) => {
  const tokenType = data[0].token.type;
  const [socketContainer, setSocketContainer] = useState<HTMLElement | null>(null);

  const thFinalStyle = {
    fontSize: { base: 12, md: 16 },
    fontWeight: 600,
    color: color.textPrimary,
    borderTopRightRadius: "none !important",
    borderTopLeftRadius: "none !important",
    paddingLeft: 4,
    paddingRight: 3,
    paddingY: 3,
  };

  const renderSocket = useMemo(() => {
    if (socketContainer && showSocketInfo) {
      return createPortal(
        <SocketNewItemsNotice.Desktop
          url={window.location.href}
          alert={socketInfoAlert}
          num={socketInfoNum}
          type="token_transfer"
          isLoading={isLoading}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: color.textTertiyari,
          }}
        />,
        socketContainer
      );
    }
  }, [isLoading, showSocketInfo, socketContainer, socketInfoAlert, socketInfoNum]);

  useEffect(() => {
    setSocketContainer(document.getElementById("socket-container"));
  }, []);
  return (
    <AddressHighlightProvider>
      <Table variant="simple" size="sm">
        <Thead top={top}>
          <Tr backgroundColor={color.popupHeader}>
            <Th width="280px" {...thFinalStyle}>
              Txn hash
            </Th>
            <Th width="200px" {...thFinalStyle}>
              Method
            </Th>
            <Th width={{ lg: "224px", xl: "380px" }} {...thFinalStyle}>
              From/To
            </Th>
            {NFT_TOKEN_TYPE_IDS.includes(tokenType) && (
              <Th width={tokenType === "ERC-1155" || tokenType === "ERC-404" ? "50%" : "100%"} {...thFinalStyle}>
                Token ID
              </Th>
            )}
            {(tokenType === "ERC-20" || tokenType === "ERC-1155" || tokenType === "ERC-404") && (
              <Th width={tokenType === "ERC-20" ? "100%" : "50%"} isNumeric {...thFinalStyle}>
                <TruncatedValue value={`Value ${token?.symbol || ""}`} w="100%" verticalAlign="middle" />
              </Th>
            )}
          </Tr>
        </Thead>
        {renderSocket}
        <Tbody>
          {data.map((item, index) => (
            <TokenTransferTableItem
              key={item.tx_hash + item.block_hash + item.log_index + "_" + index}
              {...item}
              tokenId={tokenId}
              isLoading={isLoading}
              tdStyle={{
                paddingLeft: "16px",
                paddingRight: "12px",
              }}
            />
          ))}
        </Tbody>
      </Table>
    </AddressHighlightProvider>
  );
};

export default React.memo(TokenTransferTable);

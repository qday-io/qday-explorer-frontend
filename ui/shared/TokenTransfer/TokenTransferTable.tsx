import { Table, Tbody, Tr, Th } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { TokenTransfer } from "types/api/tokenTransfer";

import { AddressHighlightProvider } from "lib/contexts/addressHighlight";
import * as SocketNewItemsNotice from "ui/shared/SocketNewItemsNotice";
import { default as Thead } from "ui/shared/TheadSticky";
import TokenTransferTableItem from "ui/shared/TokenTransfer/TokenTransferTableItem";

interface Props {
  data: Array<TokenTransfer>;
  baseAddress?: string;
  showTxInfo?: boolean;
  top: number;
  enableTimeIncrement?: boolean;
  showSocketInfo?: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  isLoading?: boolean;
}

const TokenTransferTable = ({
  data,
  baseAddress,
  showTxInfo,
  top,
  enableTimeIncrement,
  showSocketInfo,
  socketInfoAlert,
  socketInfoNum,
  isLoading,
}: Props) => {
  const thStyle = {
    color: color.textPrimary,
    fontSize: 16,
    fontWeight: 600,
    paddingY: 5,
  };

  return (
    <AddressHighlightProvider>
      <Table variant="simple" size="sm" minW="950px">
        <Thead top={top}>
          <Tr
            sx={{
              "& th:first-child": {
                borderTopLeftRadius: 0,
                paddingLeft: 4,
              },
              "& th:last-child": {
                borderTopRightRadius: 0,
              },
            }}
            backgroundColor={color.popupHeader}
          >
            {showTxInfo && <Th width="44px" {...thStyle}></Th>}
            <Th width="230px" {...thStyle}>
              Token
            </Th>
            <Th width="160px" {...thStyle}>
              Token ID
            </Th>
            {showTxInfo && (
              <Th width="200px" {...thStyle}>
                Txn hash
              </Th>
            )}
            <Th width="60%" {...thStyle}>
              From/To
            </Th>
            <Th width="40%" isNumeric {...thStyle}>
              Value
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {showSocketInfo && (
            <SocketNewItemsNotice.Desktop
              url={window.location.href}
              alert={socketInfoAlert}
              num={socketInfoNum}
              type="token_transfer"
              isLoading={isLoading}
            />
          )}
          {data.map((item, index) => (
            <TokenTransferTableItem
              key={item.tx_hash + item.block_hash + item.log_index + (isLoading ? index : "")}
              {...item}
              baseAddress={baseAddress}
              showTxInfo={showTxInfo}
              enableTimeIncrement={enableTimeIncrement}
              isLoading={isLoading}
            />
          ))}
        </Tbody>
      </Table>
    </AddressHighlightProvider>
  );
};

export default React.memo(TokenTransferTable);

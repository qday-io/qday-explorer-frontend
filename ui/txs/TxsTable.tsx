import { Link, Table, Tbody, Tr, Th } from "@chakra-ui/react";
import { color } from "enums/colors";
import { AnimatePresence } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import type { Transaction, TransactionsSortingField, TransactionsSortingValue } from "types/api/transaction";

import config from "configs/app";
import { AddressHighlightProvider } from "lib/contexts/addressHighlight";
import useIsMobile from "lib/hooks/useIsMobile";
import useLazyRenderedList from "lib/hooks/useLazyRenderedList";
import { currencyUnits } from "lib/units";
import IconSvg from "ui/shared/IconSvg";
import * as SocketNewItemsNotice from "ui/shared/SocketNewItemsNotice";
import TheadSticky from "ui/shared/TheadSticky";

import TxsTableItem from "./TxsTableItem";

type Props = {
  txs: Array<Transaction>;
  sort: (field: TransactionsSortingField) => () => void;
  sorting?: TransactionsSortingValue;
  top: number;
  showBlockInfo: boolean;
  showSocketInfo: boolean;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  currentAddress?: string;
  enableTimeIncrement?: boolean;
  isLoading?: boolean;
};

const TxsTable = ({
  txs,
  sort,
  sorting,
  top,
  showBlockInfo,
  showSocketInfo,
  socketInfoAlert,
  socketInfoNum,
  currentAddress,
  enableTimeIncrement,
  isLoading,
}: Props) => {
  const [socketContainer, setSocketContainer] = useState<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const renderSocket = useMemo(() => {
    if (socketContainer && showSocketInfo && !isMobile) {
      return createPortal(
        <SocketNewItemsNotice.Desktop
          url={window.location.href}
          num={socketInfoNum}
          alert={socketInfoAlert}
          type="transaction"
          isLoading={isLoading}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: color.textBlack,
          }}
        />,
        socketContainer
      );
    }
  }, [isLoading, isMobile, showSocketInfo, socketContainer, socketInfoAlert, socketInfoNum]);

  useEffect(() => {
    setSocketContainer(document.getElementById("transactions-tab-socket"));
  }, []);

  const { cutRef, renderedItemsNum } = useLazyRenderedList(txs, !isLoading);
  const feeCurrency =
    config.UI.views.tx.hiddenFields?.fee_currency || config.chain.hasMultipleGasCurrencies
      ? ""
      : " " + currencyUnits.ether;

  const thStyle = {
    fontSize: 16,
    fontWeight: 600,
    color: color.textPrimary,
  };

  return (
    <AddressHighlightProvider>
      <Table variant="simple" minWidth="950px" size="xs">
        <TheadSticky top={top}>
          <Tr
            backgroundColor={color.popupHeader}
            sx={{
              "& th:first-child": {
                borderTopLeftRadius: 0,
                paddingLeft: 4,
              },
              "& th:last-child": {
                borderTopRightRadius: 0,
              },
            }}
          >
            <Th width="54px" {...thStyle}></Th>
            <Th width="180px" {...thStyle}>
              Txn hash
            </Th>
            <Th width="160px" {...thStyle}>
              Type
            </Th>
            <Th width="20%" {...thStyle}>
              Method
            </Th>
            {showBlockInfo && (
              <Th width="18%" {...thStyle}>
                Block
              </Th>
            )}
            <Th width="224px" {...thStyle}>
              From/To
            </Th>
            {!config.UI.views.tx.hiddenFields?.value && (
              <Th isNumeric width="12%" {...thStyle} style={{ textAlign: "left" }}>
                <Link
                  onClick={sort("value")}
                  display="flex"
                  justifyContent="start"
                  color={color.textPrimary}
                  paddingLeft={{ base: 0, xl: 8 }}
                >
                  {sorting === "value-asc" && <IconSvg boxSize={5} name="arrows/east" transform="rotate(-90deg)" />}
                  {sorting === "value-desc" && <IconSvg boxSize={5} name="arrows/east" transform="rotate(90deg)" />}
                  {`Value ${currencyUnits.ether}`}
                </Link>
              </Th>
            )}
            {!config.UI.views.tx.hiddenFields?.tx_fee && (
              <Th width="20%" isNumeric pr={5} {...thStyle}>
                <Link onClick={sort("fee")} display="flex" justifyContent="end" color={color.textPrimary}>
                  {sorting === "fee-asc" && <IconSvg boxSize={5} name="arrows/east" transform="rotate(-90deg)" />}
                  {sorting === "fee-desc" && <IconSvg boxSize={5} name="arrows/east" transform="rotate(90deg)" />}
                  {`Fee${feeCurrency}`}
                </Link>
              </Th>
            )}
          </Tr>
        </TheadSticky>
        <Tbody>
          {renderSocket}
          <AnimatePresence initial={false}>
            {txs.slice(0, renderedItemsNum).map((item, index) => (
              <TxsTableItem
                key={item.hash + (isLoading ? index : "")}
                tx={item}
                showBlockInfo={showBlockInfo}
                currentAddress={currentAddress}
                enableTimeIncrement={enableTimeIncrement}
                isLoading={isLoading}
              />
            ))}
          </AnimatePresence>
        </Tbody>
      </Table>
      <div ref={cutRef} />
    </AddressHighlightProvider>
  );
};

export default React.memo(TxsTable);

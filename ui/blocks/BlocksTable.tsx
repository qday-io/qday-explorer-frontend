import { Table, Tbody, Tr, Th } from "@chakra-ui/react";
import { color } from "enums/colors";
import { AnimatePresence } from "framer-motion";
import capitalize from "lodash/capitalize";
import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import type { Block } from "types/api/block";

import config from "configs/app";
import { AddressHighlightProvider } from "lib/contexts/addressHighlight";
import useIsMobile from "lib/hooks/useIsMobile";
import getNetworkValidatorTitle from "lib/networks/getNetworkValidatorTitle";
import { currencyUnits } from "lib/units";
import BlocksTableItem from "ui/blocks/BlocksTableItem";
import * as SocketNewItemsNotice from "ui/shared/SocketNewItemsNotice";
import { default as Thead } from "ui/shared/TheadSticky";

interface Props {
  data: Array<Block>;
  isLoading?: boolean;
  top: number;
  page: number;
  socketInfoNum?: number;
  socketInfoAlert?: string;
  showSocketInfo?: boolean;
}

const VALIDATOR_COL_WEIGHT = 23;
const GAS_COL_WEIGHT = 33;
const REWARD_COL_WEIGHT = 22;
const FEES_COL_WEIGHT = 22;

const isRollup = config.features.rollup.isEnabled;

const thStyle = {
  fontWeight: 600,
  fontSize: 16,
  color: color.textPrimary,
};

const BlocksTable = ({ data, isLoading, top, page, showSocketInfo, socketInfoNum, socketInfoAlert }: Props) => {
  const [socketContainer, setSocketContainer] = useState<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const widthBase =
    (!config.UI.views.block.hiddenFields?.miner ? VALIDATOR_COL_WEIGHT : 0) +
    GAS_COL_WEIGHT +
    (!isRollup && !config.UI.views.block.hiddenFields?.total_reward ? REWARD_COL_WEIGHT : 0) +
    (!isRollup && !config.UI.views.block.hiddenFields?.burnt_fees ? FEES_COL_WEIGHT : 0);

  const renderSocket = useMemo(() => {
    if (socketContainer && showSocketInfo && !isMobile) {
      return createPortal(
        <SocketNewItemsNotice.Desktop
          url={window.location.href}
          alert={socketInfoAlert}
          num={socketInfoNum}
          type="block"
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
    setSocketContainer(document.getElementById("blocks-tab-socket"));
  }, []);

  return (
    <AddressHighlightProvider>
      <Table variant="simple" minWidth="1040px" size="md" fontWeight={500}>
        <Thead top={top}>
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
            <Th width="125px" {...thStyle}>
              Block
            </Th>
            <Th {...thStyle} width="120px">
              Size, byte
            </Th>
            {!config.UI.views.block.hiddenFields?.miner && (
              <Th {...thStyle} width={`${(VALIDATOR_COL_WEIGHT / widthBase) * 100}%`} minW="160px">
                {capitalize(getNetworkValidatorTitle())}
              </Th>
            )}
            <Th {...thStyle} width="64px" isNumeric>
              Txn
            </Th>
            <Th {...thStyle} width={`${(GAS_COL_WEIGHT / widthBase) * 100}%`}>
              Gas used
            </Th>
            {!isRollup && !config.UI.views.block.hiddenFields?.total_reward && (
              <Th {...thStyle} width={`${(REWARD_COL_WEIGHT / widthBase) * 100}%`}>
                Reward {currencyUnits.ether}
              </Th>
            )}
            {!isRollup && !config.UI.views.block.hiddenFields?.burnt_fees && (
              <Th {...thStyle} width={`${(FEES_COL_WEIGHT / widthBase) * 100}%`}>
                Burnt fees {currencyUnits.ether}
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody>
          {renderSocket}
          <AnimatePresence initial={false}>
            {data.map((item, index) => (
              <BlocksTableItem
                key={item.height + (isLoading ? `${index}_${page}` : "")}
                data={item}
                enableTimeIncrement={page === 1 && !isLoading}
                isLoading={isLoading}
              />
            ))}
          </AnimatePresence>
        </Tbody>
      </Table>
    </AddressHighlightProvider>
  );
};

export default BlocksTable;

import { Table, Tbody, Tr, Th } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { TxStateChange } from "types/api/txStateChanges";

import { AddressHighlightProvider } from "lib/contexts/addressHighlight";
import { default as Thead } from "ui/shared/TheadSticky";
import TxStateTableItem from "ui/tx/state/TxStateTableItem";

interface Props {
  data: Array<TxStateChange>;
  isLoading?: boolean;
  top: number;
}

const TxStateTable = ({ data, isLoading, top }: Props) => {
  const thStyle = {
    fontWeight: 600,
    fontSize: 16,
    color: color.textPrimary,
  };

  return (
    <AddressHighlightProvider>
      <Table variant="simple" minWidth="1000px" size="sm" w="100%">
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
            <Th width="140px" {...thStyle}>
              Type
            </Th>
            <Th width="160px" {...thStyle}>
              Address
            </Th>
            <Th width="33%" isNumeric {...thStyle}>
              Before
            </Th>
            <Th width="33%" isNumeric {...thStyle}>
              After
            </Th>
            <Th width="33%" isNumeric {...thStyle}>
              Change
            </Th>
            <Th width="150px" minW="80px" maxW="150px" {...thStyle}>
              Token ID
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item, index) => (
            <TxStateTableItem data={item} key={index} isLoading={isLoading} />
          ))}
        </Tbody>
      </Table>
    </AddressHighlightProvider>
  );
};

export default React.memo(TxStateTable);

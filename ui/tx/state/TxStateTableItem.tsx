import { Tr, Td, Box } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { TxStateChange } from "types/api/txStateChanges";

import AddressEntity from "ui/shared/entities/address/AddressEntity";

import { getStateElements } from "./utils";

interface Props {
  data: TxStateChange;
  isLoading?: boolean;
}

const TxStateTableItem = ({ data, isLoading }: Props) => {
  const { before, after, change, tag, tokenId } = getStateElements(data, isLoading);

  const tdStyle = {
    fontSize: 16,
    fontWeight: 600,
    color: color.textPrimary,
  };

  return (
    <Tr>
      <Td {...tdStyle}>
        <Box py="3px">{tag}</Box>
      </Td>
      <Td>
        <AddressEntity
          address={data.address}
          isLoading={isLoading}
          truncation="constant"
          my="7px"
          w="100%"
          colorHighlight={color.textInfo}
          fontSize={16}
          fontWeight={400}
        />
      </Td>
      <Td isNumeric {...tdStyle}>
        <Box py="7px">{before}</Box>
      </Td>
      <Td isNumeric {...tdStyle}>
        <Box py="7px">{after}</Box>
      </Td>
      <Td isNumeric {...tdStyle}>
        <Box py="7px">{change}</Box>
      </Td>
      <Td {...tdStyle}>{tokenId}</Td>
    </Tr>
  );
};

export default React.memo(TxStateTableItem);

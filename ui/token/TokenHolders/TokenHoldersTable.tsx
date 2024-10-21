import { Table, Tbody, Tr, Th } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { TokenHolder, TokenInfo } from "types/api/token";

import { default as Thead } from "ui/shared/TheadSticky";
import TokenHoldersTableItem from "ui/token/TokenHolders/TokenHoldersTableItem";

interface Props {
  data: Array<TokenHolder>;
  token: TokenInfo;
  top: number;
  isLoading?: boolean;
  tHeadStyle?: React.CSSProperties;
}

const TokenHoldersTable = ({ data, token, top, isLoading, tHeadStyle }: Props) => {
  const thStyle = {
    padding: "12px 16px",
    fontSize: 16,
    fontWeight: 600,
    color: color.textPrimary,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  };
  return (
    <Table variant="simple" size="sm" layout="auto">
      <Thead top={top} style={tHeadStyle}>
        <Tr borderRadius={0}>
          <Th style={thStyle}>Holder</Th>
          {(token.type === "ERC-1155" || token.type === "ERC-404") && <Th style={thStyle}>ID#</Th>}
          <Th isNumeric style={thStyle}>
            Quantity
          </Th>
          {token.total_supply && token.type !== "ERC-404" && (
            <Th isNumeric width="175px" style={thStyle}>
              Percentage
            </Th>
          )}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <TokenHoldersTableItem
            key={item.address.hash + (isLoading ? index : "")}
            holder={item}
            token={token}
            isLoading={isLoading}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default React.memo(TokenHoldersTable);

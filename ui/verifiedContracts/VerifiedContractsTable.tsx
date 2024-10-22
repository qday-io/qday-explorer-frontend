import { Table, Tbody, Tr, Th, Link } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { VerifiedContract } from "types/api/contracts";
import type {
  VerifiedContractsSorting,
  VerifiedContractsSortingField,
  VerifiedContractsSortingValue,
} from "types/api/verifiedContracts";

import { currencyUnits } from "lib/units";
import { ACTION_BAR_HEIGHT_DESKTOP } from "ui/shared/ActionBar";
import IconSvg from "ui/shared/IconSvg";
import getNextSortValue from "ui/shared/sort/getNextSortValue";
import { default as Thead } from "ui/shared/TheadSticky";
import { SORT_SEQUENCE } from "ui/verifiedContracts/utils";

import VerifiedContractsTableItem from "./VerifiedContractsTableItem";

interface Props {
  data: Array<VerifiedContract>;
  sort: VerifiedContractsSortingValue | undefined;
  setSorting: (val: VerifiedContractsSortingValue | undefined) => void;
  isLoading?: boolean;
}

const VerifiedContractsTable = ({ data, sort, setSorting, isLoading }: Props) => {
  const sortIconTransform = sort?.includes("asc" as VerifiedContractsSorting["order"])
    ? "rotate(-90deg)"
    : "rotate(90deg)";

  const thStyle = {
    fontSize: 16,
    fontWeight: 600,
    color: color.textPrimary,
    paddingY: 3,
  };

  const linkStyle = {
    color: color.textPrimary,
  };

  const onSortToggle = React.useCallback(
    (field: VerifiedContractsSortingField) => () => {
      const value = getNextSortValue<VerifiedContractsSortingField, VerifiedContractsSortingValue>(
        SORT_SEQUENCE,
        field
      )(sort);
      setSorting(value);
    },
    [sort, setSorting]
  );

  return (
    <Table variant="simple" size="sm" minW="915px">
      <Thead top={ACTION_BAR_HEIGHT_DESKTOP}>
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
          <Th width="50%" {...thStyle}>
            Contract
          </Th>
          <Th width="180px" isNumeric {...thStyle}>
            <Link
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              onClick={isLoading ? undefined : onSortToggle("balance")}
              columnGap={1}
              {...linkStyle}
            >
              {sort?.includes("balance") && <IconSvg name="arrows/east" boxSize={4} transform={sortIconTransform} />}
              Balance {currencyUnits.ether}
            </Link>
          </Th>
          <Th width="150px" isNumeric {...thStyle}>
            <Link
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              onClick={isLoading ? undefined : onSortToggle("txs_count")}
              columnGap={1}
              {...linkStyle}
            >
              {sort?.includes("txs_count") && <IconSvg name="arrows/east" boxSize={4} transform={sortIconTransform} />}
              Txs
            </Link>
          </Th>
          <Th width="50%" {...thStyle}>
            Compiler / version
          </Th>
          <Th width="100px" {...thStyle}>
            Settings
          </Th>
          <Th width="150px" {...thStyle}>
            Verified
          </Th>
          <Th width="130px" {...thStyle}>
            License
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, index) => (
          <VerifiedContractsTableItem
            key={item.address.hash + (isLoading ? index : "")}
            data={item}
            isLoading={isLoading}
          />
        ))}
      </Tbody>
    </Table>
  );
};

export default React.memo(VerifiedContractsTable);

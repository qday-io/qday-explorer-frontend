import { color } from "enums/colors";
import React from "react";

import type { TxStateChange } from "types/api/txStateChanges";

import AddressEntity from "ui/shared/entities/address/AddressEntity";
import ListItemMobileGrid from "ui/shared/ListItemMobile/ListItemMobileGrid";

import { getStateElements } from "./utils";

interface Props {
  data: TxStateChange;
  isLoading?: boolean;
}

const TxStateListItem = ({ data, isLoading }: Props) => {
  const { before, after, change, tag, tokenId } = getStateElements(data, isLoading);

  const labelContentProps = {
    fontSize: 14,
    fontWeight: 600,
    color: color.textPrimary,
  };

  const valueContentProps = {
    fontSize: 14,
    fontWeight: 600,
    color: { base: color.textSecondary, md: color.textPrimary },
  };

  return (
    <ListItemMobileGrid.Container>
      <ListItemMobileGrid.Label isLoading={isLoading} {...labelContentProps}>
        Address
      </ListItemMobileGrid.Label>
      <ListItemMobileGrid.Value py="3px" display="flex" flexWrap="nowrap" columnGap={3}>
        <AddressEntity
          address={data.address}
          isLoading={isLoading}
          truncation="constant"
          colorHighlight={color.textInfo}
          fontSize={{ base: 14, md: 16 }}
          fontWeight={{ base: 500, md: 400 }}
        />
        {tag}
      </ListItemMobileGrid.Value>

      {before && (
        <>
          <ListItemMobileGrid.Label isLoading={isLoading} {...labelContentProps}>
            Before
          </ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value {...valueContentProps}>{before}</ListItemMobileGrid.Value>
        </>
      )}

      {after && (
        <>
          <ListItemMobileGrid.Label isLoading={isLoading} {...labelContentProps}>
            After
          </ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value {...valueContentProps}>{after}</ListItemMobileGrid.Value>
        </>
      )}

      {change && (
        <>
          <ListItemMobileGrid.Label isLoading={isLoading} {...labelContentProps}>
            Change
          </ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value {...valueContentProps}>{change}</ListItemMobileGrid.Value>
        </>
      )}

      {tokenId && (
        <>
          <ListItemMobileGrid.Label isLoading={isLoading} {...labelContentProps}>
            Token ID
          </ListItemMobileGrid.Label>
          <ListItemMobileGrid.Value {...valueContentProps} py="0">
            {tokenId}
          </ListItemMobileGrid.Value>
        </>
      )}
    </ListItemMobileGrid.Container>
  );
};

export default TxStateListItem;

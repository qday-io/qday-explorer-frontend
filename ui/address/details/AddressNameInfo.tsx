import { Skeleton } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { Address } from "types/api/address";

import * as DetailsInfoItem from "ui/shared/DetailsInfoItem";
import TokenEntity from "ui/shared/entities/token/TokenEntity";

interface Props {
  data: Pick<Address, "name" | "token" | "is_contract">;
  isLoading: boolean;
}

const AddressNameInfo = ({ data, isLoading }: Props) => {
  const labelContentProps = {
    alignItems: "center",
    color: color.textSecondary,
    fontSize: { base: 14, md: 16 },
    fontWeight: 600,
  };

  if (data.token) {
    return (
      <>
        <DetailsInfoItem.Label hint="Token name and symbol" isLoading={isLoading} contentProps={labelContentProps}>
          Token name
        </DetailsInfoItem.Label>
        <DetailsInfoItem.Value>
          <TokenEntity token={data.token} isLoading={isLoading} noIcon noCopy />
        </DetailsInfoItem.Value>
      </>
    );
  }

  if (data.is_contract && data.name) {
    return (
      <>
        <DetailsInfoItem.Label
          hint="The name found in the source code of the Contract"
          isLoading={isLoading}
          contentProps={labelContentProps}
        >
          Contract name
        </DetailsInfoItem.Label>
        <DetailsInfoItem.Value>
          <Skeleton isLoaded={!isLoading}>{data.name}</Skeleton>
        </DetailsInfoItem.Value>
      </>
    );
  }

  if (data.name) {
    return (
      <>
        <DetailsInfoItem.Label hint="The name of the validator" isLoading={isLoading} contentProps={labelContentProps}>
          Validator name
        </DetailsInfoItem.Label>
        <DetailsInfoItem.Value>
          <Skeleton isLoaded={!isLoading}>{data.name}</Skeleton>
        </DetailsInfoItem.Value>
      </>
    );
  }

  return null;
};

export default React.memo(AddressNameInfo);

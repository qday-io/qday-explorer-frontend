import { Skeleton } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { color } from "enums/colors";
import React from "react";

import type { TokenInfo } from "types/api/token";

import config from "configs/app";
import { WEI, WEI_IN_GWEI } from "lib/consts";
import { currencyUnits } from "lib/units";
import * as DetailsInfoItem from "ui/shared/DetailsInfoItem";
import TokenEntity from "ui/shared/entities/token/TokenEntity";

interface Props {
  gasToken?: TokenInfo<"ERC-20"> | null;
  gasPrice: string | null;
  isLoading?: boolean;
}

const TxDetailsGasPrice = ({ gasPrice, gasToken, isLoading }: Props) => {
  if (config.UI.views.tx.hiddenFields?.gas_price || !gasPrice) {
    return null;
  }

  const labelContentProps = {
    alignItems: "center",
    color: color.textSecondary,
    fontSize: { base: 14, md: 16 },
    fontWeight: 600,
  };

  const valueContentProps = {
    alignItems: "center",
    color: color.textPrimary,
    fontSize: { base: 14, md: 16 },
    fontWeight: 500,
  };

  const content = (() => {
    if (gasToken) {
      return (
        <Skeleton isLoaded={!isLoading} display="flex">
          <span>{BigNumber(gasPrice).dividedBy(WEI).toFixed()}</span>
          <TokenEntity
            token={gasToken}
            noCopy
            onlySymbol
            w="auto"
            ml={1}
            fontSize={{ base: 14, md: 16 }}
            fontWeight={500}
            colorHighlight={color.textSecondary}
          />
        </Skeleton>
      );
    }

    return (
      <>
        <Skeleton isLoaded={!isLoading} mr={1}>
          {BigNumber(gasPrice).dividedBy(WEI).toFixed()} {currencyUnits.ether}
        </Skeleton>
        <Skeleton isLoaded={!isLoading} color="text_secondary">
          <span>
            ({BigNumber(gasPrice).dividedBy(WEI_IN_GWEI).toFixed()} {currencyUnits.gwei})
          </span>
        </Skeleton>
      </>
    );
  })();

  return (
    <>
      <DetailsInfoItem.Label
        hint="Price per unit of gas specified by the sender. Higher gas prices can prioritize transaction inclusion during times of high usage"
        isLoading={isLoading}
        contentProps={labelContentProps}
      >
        Gas price
      </DetailsInfoItem.Label>
      <DetailsInfoItem.Value contentProps={valueContentProps}>{content}</DetailsInfoItem.Value>
    </>
  );
};

export default TxDetailsGasPrice;

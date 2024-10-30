import { Flex, Skeleton, Text } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { color } from "enums/colors";
import capitalize from "lodash/capitalize";
import React from "react";

import type { Block } from "types/api/block";

import { route } from "nextjs-routes";

import config from "configs/app";
import getBlockTotalReward from "lib/block/getBlockTotalReward";
import { WEI } from "lib/consts";
import getNetworkValidatorTitle from "lib/networks/getNetworkValidatorTitle";
import { currencyUnits } from "lib/units";
import BlockGasUsed from "ui/shared/block/BlockGasUsed";
import AddressEntity from "ui/shared/entities/address/AddressEntity";
import BlockEntity from "ui/shared/entities/block/BlockEntity";
import IconSvg from "ui/shared/IconSvg";
import LinkInternal from "ui/shared/links/LinkInternal";
import ListItemMobile from "ui/shared/ListItemMobile/ListItemMobile";
import TimeAgoWithTooltip from "ui/shared/TimeAgoWithTooltip";
import Utilization from "ui/shared/Utilization/Utilization";

interface Props {
  data: Block;
  isLoading?: boolean;
  enableTimeIncrement?: boolean;
}

const isRollup = config.features.rollup.isEnabled;

const BlocksListItem = ({ data, isLoading, enableTimeIncrement }: Props) => {
  const totalReward = getBlockTotalReward(data);
  const burntFees = BigNumber(data.burnt_fees || 0);
  const txFees = BigNumber(data.tx_fees || 0);

  const labelStyle = {
    fontSize: 14,
    color: color.textPrimary,
    fontWeight: 600,
    minWidth: "110px",
  };

  return (
    <ListItemMobile rowGap={3} key={String(data.height)} isAnimated>
      <Flex justifyContent="space-between" w="100%">
        <Flex columnGap={2} alignItems="center">
          <BlockEntity
            isLoading={isLoading}
            number={data.height}
            hash={data.type !== "block" ? data.hash : undefined}
            noIcon
            fontSize={14}
            colorHighLight={color.textInfo}
            fontWeight={600}
          />
        </Flex>
      </Flex>
      <Flex columnGap={2}>
        <Text {...labelStyle}>Size</Text>
        <Skeleton
          isLoaded={!isLoading}
          display="inline-block"
          fontSize={14}
          fontWeight={400}
          color={color.textSecondary}
        >
          <span>{data.size.toLocaleString()} bytes</span>
        </Skeleton>
      </Flex>
      {!config.UI.views.block.hiddenFields?.miner && (
        <Flex columnGap={2} w="100%">
          <Text {...labelStyle}>{capitalize(getNetworkValidatorTitle())}</Text>
          <AddressEntity
            address={data.miner}
            isLoading={isLoading}
            truncation="constant"
            fontSize={14}
            fontWeight={400}
            colorHighlight={color.textInfo}
          />
        </Flex>
      )}
      <Flex columnGap={2}>
        <Text {...labelStyle}>Txn</Text>
        {data.tx_count > 0 ? (
          <Skeleton isLoaded={!isLoading} display="inline-block">
            <LinkInternal
              href={route({
                pathname: "/block/[height_or_hash]",
                query: { height_or_hash: String(data.height), tab: "txs" },
              })}
              fontSize={14}
              fontWeight={400}
              color={color.textInfo}
            >
              {data.tx_count}
            </LinkInternal>
          </Skeleton>
        ) : (
          <Text variant="secondary">{data.tx_count}</Text>
        )}
      </Flex>
      <Flex columnGap={2}>
        <Text {...labelStyle}>Gas used</Text>
        <Flex>
          <Skeleton
            isLoaded={!isLoading}
            display="inline-block"
            color={color.textSecondary}
            mr={4}
            fontSize={14}
            fontWeight={700}
          >
            <span>{BigNumber(data.gas_used || 0).toFormat()}</span>
          </Skeleton>
          <BlockGasUsed
            gasUsed={data.gas_used}
            gasLimit={data.gas_limit}
            isLoading={isLoading}
            gasTarget={data.gas_target_percentage}
            gasUsedToTargetRatioContentProps={{ color: color.textSecondary, fontSize: 14, fontWeight: 400 }}
            progressUtilizationStyle={{ backgroundColor: color.textSecondary }}
            valueUtilizationStyle={{ fontSize: 14, fontWeight: 500, color: color.textSecondary }}
            fontSize={14}
          />
        </Flex>
      </Flex>
      {!isRollup && !config.UI.views.block.hiddenFields?.total_reward && (
        <Flex columnGap={2}>
          <Text {...labelStyle}>Reward {currencyUnits.ether}</Text>
          <Skeleton
            isLoaded={!isLoading}
            display="inline-block"
            fontSize={14}
            fontWeight={400}
            color={color.textSecondary}
          >
            <span>{totalReward.toFixed()}</span>
          </Skeleton>
        </Flex>
      )}
      {!isRollup && !config.UI.views.block.hiddenFields?.burnt_fees && (
        <Flex alignItems="center">
          <Text {...labelStyle}>Burnt fees</Text>
          <Flex columnGap={4} mt={2}>
            <Flex>
              <IconSvg name="flame" boxSize={5} color="gray.500" isLoading={isLoading} />
              <Skeleton
                isLoaded={!isLoading}
                display="inline-block"
                fontSize={14}
                fontWeight={500}
                color={color.textSecondary}
                ml={2}
              >
                <span>{burntFees.div(WEI).toFixed()}</span>
              </Skeleton>
            </Flex>
            <Utilization
              ml={4}
              value={burntFees.div(txFees).toNumber()}
              isLoading={isLoading}
              gasUsedToTargetRatioContentProps={{ color: color.textPrimary, fontSize: 14, fontWeight: 500 }}
              progressUtilizationStyle={{ backgroundColor: color.textGreen }}
              valueUtilizationStyle={{ fontSize: 14, fontWeight: 500, color: color.textGreen }}
              fontSize={14}
            />
          </Flex>
        </Flex>
      )}
      <TimeAgoWithTooltip
        timestamp={data.timestamp}
        enableIncrement={enableTimeIncrement}
        isLoading={isLoading}
        color={color.textTertiyari}
        fontSize={12}
        fontWeight={400}
        display="inline-block"
      />
    </ListItemMobile>
  );
};

export default BlocksListItem;

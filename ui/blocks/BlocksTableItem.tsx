import { Tr, Td, Flex, Box, Tooltip, Skeleton } from "@chakra-ui/react";
import BigNumber from "bignumber.js";
import { color } from "enums/colors";
import { motion } from "framer-motion";
import React from "react";

import type { Block } from "types/api/block";

import { route } from "nextjs-routes";

import config from "configs/app";
import getBlockTotalReward from "lib/block/getBlockTotalReward";
import { WEI } from "lib/consts";
import BlockGasUsed from "ui/shared/block/BlockGasUsed";
import AddressEntity from "ui/shared/entities/address/AddressEntity";
import BlockEntity from "ui/shared/entities/block/BlockEntity";
import IconSvg from "ui/shared/IconSvg";
import LinkInternal from "ui/shared/links/LinkInternal";
import TimeAgoWithTooltip from "ui/shared/TimeAgoWithTooltip";
import Utilization from "ui/shared/Utilization/Utilization";

interface Props {
  data: Block;
  isLoading?: boolean;
  enableTimeIncrement?: boolean;
}

const isRollup = config.features.rollup.isEnabled;

const BlocksTableItem = ({ data, isLoading, enableTimeIncrement }: Props) => {
  const totalReward = getBlockTotalReward(data);
  const burntFees = BigNumber(data.burnt_fees || 0);
  const txFees = BigNumber(data.tx_fees || 0);

  const tdStyle = {};

  return (
    <Tr
      as={motion.tr}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      key={data.height}
    >
      <Td style={tdStyle} fontSize="sm">
        <Flex columnGap={2} alignItems="center" mb={2}>
          <Tooltip isDisabled={data.type !== "reorg"} label="Chain reorganizations">
            <BlockEntity
              isLoading={isLoading}
              number={data.height}
              hash={data.type !== "block" ? data.hash : undefined}
              noIcon
              fontSize={16}
              lineHeight={5}
              fontWeight={600}
              colorHighLight={color.textInfo}
            />
          </Tooltip>
        </Flex>
        <TimeAgoWithTooltip
          timestamp={data.timestamp}
          enableIncrement={enableTimeIncrement}
          isLoading={isLoading}
          color={color.textTertiyari}
          fontSize={14}
          fontWeight={400}
          display="inline-block"
        />
      </Td>
      <Td style={tdStyle} fontSize="sm">
        <Skeleton
          isLoaded={!isLoading}
          display="inline-block"
          color={color.textSecondary}
          fontSize={16}
          fontWeight={400}
        >
          {data.size.toLocaleString()}
        </Skeleton>
      </Td>
      {!config.UI.views.block.hiddenFields?.miner && (
        <Td style={tdStyle} fontSize="sm">
          <AddressEntity
            address={data.miner}
            isLoading={isLoading}
            truncation="constant"
            colorHighlight={color.textInfo}
            fontSize={16}
            fontWeight={400}
          />
        </Td>
      )}
      <Td style={tdStyle} isNumeric fontSize="sm">
        {data.tx_count > 0 ? (
          <Skeleton isLoaded={!isLoading} display="inline-block">
            <LinkInternal
              href={route({
                pathname: "/block/[height_or_hash]",
                query: { height_or_hash: String(data.height), tab: "txs" },
              })}
              color={color.textInfo}
              fontSize={16}
              fontWeight={400}
            >
              {data.tx_count}
            </LinkInternal>
          </Skeleton>
        ) : (
          data.tx_count
        )}
      </Td>
      <Td style={tdStyle} fontSize="sm">
        <Skeleton
          isLoaded={!isLoading}
          display="inline-block"
          color={color.textSecondary}
          fontSize={16}
          fontWeight={700}
        >
          {BigNumber(data.gas_used || 0).toFormat()}
        </Skeleton>
        <Flex mt={2}>
          <BlockGasUsed
            gasUsed={data.gas_used}
            gasLimit={data.gas_limit}
            isLoading={isLoading}
            gasTarget={data.gas_target_percentage}
            gasUsedToTargetRatioContentProps={{ color: color.textSecondary, fontSize: 16, fontWeight: 400 }}
            progressUtilizationStyle={{ backgroundColor: color.textSecondary }}
            valueUtilizationStyle={{ fontSize: 16, fontWeight: 400, color: color.textSecondary }}
          />
        </Flex>
      </Td>
      {!isRollup && !config.UI.views.block.hiddenFields?.total_reward && (
        <Td style={tdStyle} fontSize="sm">
          <Skeleton
            isLoaded={!isLoading}
            display="inline-block"
            color={color.textSecondary}
            fontSize={16}
            fontWeight={400}
          >
            {totalReward.toFixed(8)}
          </Skeleton>
        </Td>
      )}
      {!isRollup && !config.UI.views.block.hiddenFields?.burnt_fees && (
        <Td style={tdStyle} fontSize="sm">
          <Flex alignItems="center" columnGap={2}>
            <IconSvg name="flame" boxSize={5} color={color.textSecondary} isLoading={isLoading} />
            <Skeleton
              isLoaded={!isLoading}
              display="inline-block"
              color={color.textSecondary}
              fontSize={16}
              fontWeight={700}
            >
              {burntFees.dividedBy(WEI).toFixed(8)}
            </Skeleton>
          </Flex>
          <Tooltip label={isLoading ? undefined : "Burnt fees / Txn fees * 100%"}>
            <Box w="min-content">
              <Utilization
                mt={2}
                value={burntFees.div(txFees).toNumber()}
                isLoading={isLoading}
                valueUtilizationStyle={{ color: color.textGreen, fontSize: 16, fontWeight: 700 }}
              />
            </Box>
          </Tooltip>
        </Td>
      )}
    </Tr>
  );
};

export default React.memo(BlocksTableItem);

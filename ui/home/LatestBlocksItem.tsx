import { Box, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import SvgBlock from "assets/icons/SvgBlock";
import { color } from "enums/colors";
import { motion } from "framer-motion";
import React from "react";

import type { Block } from "types/api/block";

import config from "configs/app";
import getBlockTotalReward from "lib/block/getBlockTotalReward";
import getNetworkValidatorTitle from "lib/networks/getNetworkValidatorTitle";
import AddressEntity from "ui/shared/entities/address/AddressEntity";
import TimeAgoWithTooltip from "ui/shared/TimeAgoWithTooltip";

type Props = {
  block: Block;
  isLoading?: boolean;
};

const LatestBlocksItem = ({ block, isLoading }: Props) => {
  const totalReward = getBlockTotalReward(block);

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ display: "none" }}
      transitionDuration="normal"
      transitionTimingFunction="linear"
      border="1px solid"
      borderColor="divider"
      p={3}
      backgroundColor={color.bgPopup}
      paddingY={2}
      paddingX={3}
      borderRadius={8}
    >
      <Flex alignItems="center" overflow="hidden" w="100%" mb={3}>
        <Box backgroundColor={color.opacityGreen} paddingX={2} paddingY={1} borderRadius={8} width="fit-content">
          <Flex gap={2} alignItems="center">
            <Skeleton isLoaded={!isLoading}>
              <SvgBlock width={20} height={20} fill={color.green} />
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              <Text as="span" color={color.green} fontSize={12} fontWeight={400} lineHeight={5}>
                {`#${block.height}`}
              </Text>
            </Skeleton>
          </Flex>
        </Box>
      </Flex>

      <Box paddingY={3}>
        <Flex columnGap={2} flexWrap="wrap">
          <Flex rowGap={4} width="100%" flexWrap="wrap">
            <Box width="50%">
              <Skeleton isLoaded={!isLoading}>
                <Heading fontFamily="inherit" fontSize={12} lineHeight={5} fontWeight={700} color={color.textSecondary}>
                  Txn
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Heading fontFamily="inherit" fontSize={16} lineHeight={6} fontWeight={600} color={color.textPrimary}>
                  {block.tx_count}
                </Heading>
              </Skeleton>
            </Box>
            <Box width="50%">
              <Skeleton isLoaded={!isLoading}>
                <Heading fontFamily="inherit" fontSize={12} lineHeight={5} fontWeight={700} color={color.textSecondary}>
                  Reward
                </Heading>
              </Skeleton>
              <Skeleton isLoaded={!isLoading}>
                <Heading fontFamily="inherit" fontSize={16} lineHeight={6} fontWeight={600} color={color.textPrimary}>
                  {totalReward.dp(10).toFixed()}
                </Heading>
              </Skeleton>
            </Box>
            <Box width="50%">
              {!config.features.rollup.isEnabled && !config.UI.views.block.hiddenFields?.miner && (
                <>
                  <Skeleton isLoaded={!isLoading} textTransform="capitalize">
                    <Heading
                      fontFamily="inherit"
                      fontSize={12}
                      lineHeight={5}
                      fontWeight={700}
                      color={color.textSecondary}
                    >
                      {getNetworkValidatorTitle()}
                    </Heading>
                  </Skeleton>
                  <AddressEntity
                    address={block.miner}
                    isLoading={isLoading}
                    noIcon
                    noCopy
                    truncation="constant"
                    style
                    colorHighlight={color.textInfo}
                    textHover={{
                      textDecoration: "none",
                    }}
                  />
                </>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>
      <TimeAgoWithTooltip
        timestamp={block.timestamp}
        enableIncrement={!isLoading}
        isLoading={isLoading}
        fontSize={12}
        lineHeight={5}
        fontWeight={400}
        color={color.textTertiyari}
      />
    </Box>
  );
};

export default LatestBlocksItem;

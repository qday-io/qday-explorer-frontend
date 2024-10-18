import { Box, Heading, Flex, Text, VStack, Skeleton } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import SvgDoubleArrowRight from "assets/icons/SvgDoubleArrowRight";
import { BLOCKS_MAX_COUNT_DEFAULT, BLOCKS_MAX_COUNT_DESKTOP, BLOCKS_MAX_COUNT_MOBILE } from "constant/common";
import { color } from "enums/colors";
import { AnimatePresence } from "framer-motion";
import React from "react";

import type { SocketMessage } from "lib/socket/types";
import type { Block } from "types/api/block";

import { route } from "nextjs-routes";

import config from "configs/app";
import useApiQuery, { getResourceKey } from "lib/api/useApiQuery";
import useIsMobile from "lib/hooks/useIsMobile";
import { nbsp } from "lib/html-entities";
import useSocketChannel from "lib/socket/useSocketChannel";
import useSocketMessage from "lib/socket/useSocketMessage";
import { BLOCK } from "stubs/block";
import { HOMEPAGE_STATS } from "stubs/stats";
import LinkInternal from "ui/shared/links/LinkInternal";

import LatestBlocksItem from "./LatestBlocksItem";

const LatestBlocks = () => {
  const isMobile = useIsMobile();

  let blocksMaxCount: number;
  if (config.features.rollup.isEnabled || config.UI.views.block.hiddenFields?.total_reward) {
    blocksMaxCount = isMobile ? BLOCKS_MAX_COUNT_MOBILE : BLOCKS_MAX_COUNT_DESKTOP;
  } else {
    blocksMaxCount = BLOCKS_MAX_COUNT_DEFAULT;
  }
  const { data, isPlaceholderData, isError } = useApiQuery("homepage_blocks", {
    queryOptions: {
      placeholderData: Array(blocksMaxCount).fill(BLOCK),
    },
  });

  const queryClient = useQueryClient();
  const statsQueryResult = useApiQuery("stats", {
    queryOptions: {
      refetchOnMount: false,
      placeholderData: HOMEPAGE_STATS,
    },
  });

  const handleNewBlockMessage: SocketMessage.NewBlock["handler"] = React.useCallback(
    (payload) => {
      queryClient.setQueryData(getResourceKey("homepage_blocks"), (prevData: Array<Block> | undefined) => {
        const newData = prevData ? [...prevData] : [];

        if (newData.some((block) => block.height === payload.block.height)) {
          return newData;
        }

        return [payload.block, ...newData].sort((b1, b2) => b2.height - b1.height).slice(0, blocksMaxCount);
      });
    },
    [queryClient, blocksMaxCount]
  );

  const channel = useSocketChannel({
    topic: "blocks:new_block",
    isDisabled: isPlaceholderData || isError,
  });
  useSocketMessage({
    channel,
    event: "new_block",
    handler: handleNewBlockMessage,
  });

  let content;

  if (isError) {
    content = <Text>No data. Please reload page.</Text>;
  }

  if (data) {
    const dataToShow = data.slice(0, blocksMaxCount);

    content = (
      <>
        <VStack spacing={{ base: 3, lg: 2 }} mb={3} overflow="hidden" alignItems="stretch">
          <AnimatePresence initial={false}>
            {dataToShow.map((block, index) => (
              <LatestBlocksItem
                key={block.height + (isPlaceholderData ? String(index) : "")}
                block={block}
                isLoading={isPlaceholderData}
              />
            ))}
          </AnimatePresence>
        </VStack>
        <Flex justifyContent="center">
          <LinkInternal
            fontSize={12}
            fontWeight={600}
            lineHeight={5}
            color={color.textBrand}
            _hover={{ opacity: "0.8", color: color.textBrand }}
            href={route({ pathname: "/blocks" })}
          >
            <Flex alignItems="center" gap={2}>
              View all blocks
              <SvgDoubleArrowRight />
            </Flex>
          </LinkInternal>
        </Flex>
      </>
    );
  }

  return (
    <Box width={{ base: "100%", lg: "30%" }} flexShrink={0}>
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Heading
          fontSize={{ base: 16, lg: 20 }}
          lineHeight={{ base: 6, lg: 8 }}
          fontWeight={700}
          color={color.textPrimary}
          fontFamily="inherit"
        >
          Latest blocks
        </Heading>
        {statsQueryResult.data?.network_utilization_percentage !== undefined && (
          <Skeleton isLoaded={!statsQueryResult.isPlaceholderData} mt={1} display="inline-block">
            <Text as="span" fontSize={{ base: 10, md: 12 }} lineHeight={5} fontWeight={400} color={color.textSecondary}>
              Network utilization:{nbsp}
            </Text>
            <Text as="span" fontSize={{ base: 10, md: 12 }} lineHeight={5} fontWeight={400} color={color.textInfo}>
              {statsQueryResult.data?.network_utilization_percentage.toFixed(2)}%
            </Text>
          </Skeleton>
        )}
      </Flex>
      <Box mt={3}>{content}</Box>
    </Box>
  );
};

export default LatestBlocks;

import type { FlexProps } from "@chakra-ui/react";
import { Flex, Box, Text, Skeleton } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { PaginationParams } from "ui/shared/pagination/types";

import { route } from "nextjs-routes";

import useApiQuery from "lib/api/useApiQuery";
import { nbsp } from "lib/html-entities";
import { HOMEPAGE_STATS } from "stubs/stats";
import IconSvg from "ui/shared/IconSvg";
import LinkInternal from "ui/shared/links/LinkInternal";

interface Props {
  pagination: PaginationParams;
  containerProps?: FlexProps;
}

const BlocksTabSlot = ({ containerProps }: Props) => {
  const statsQuery = useApiQuery("stats", {
    queryOptions: {
      placeholderData: HOMEPAGE_STATS,
    },
  });

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      columnGap={8}
      display={{ base: "none", lg: "flex" }}
      {...containerProps}
    >
      {statsQuery.data?.network_utilization_percentage !== undefined && (
        <Box>
          <Text as="span" fontSize={16} fontWeight={600} color={color.textTertiyari}>
            Network utilization (last 50 blocks):{nbsp}
          </Text>
          <Skeleton
            display="inline-block"
            fontSize={16}
            fontWeight={600}
            color={color.textInfo}
            isLoaded={!statsQuery.isPlaceholderData}
          >
            <span>{statsQuery.data.network_utilization_percentage.toFixed(2)}%</span>
          </Skeleton>
        </Box>
      )}
      <LinkInternal
        display="inline-flex"
        alignItems="center"
        href={route({ pathname: "/block/countdown" })}
        color={color.textBrand}
        fontSize={{ base: 12, md: 16 }}
        fontWeight={600}
      >
        <IconSvg name="hourglass" boxSize={5} mr={2} color={color.textBrand} />
        <span>Block countdown</span>
      </LinkInternal>
    </Flex>
  );
};

export default BlocksTabSlot;

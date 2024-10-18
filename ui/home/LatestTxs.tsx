import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import SvgDoubleArrowRight from "assets/icons/SvgDoubleArrowRight";
import { color } from "enums/colors";
import React from "react";

import { route } from "nextjs-routes";

import useApiQuery from "lib/api/useApiQuery";
import { AddressHighlightProvider } from "lib/contexts/addressHighlight";
import useIsMobile from "lib/hooks/useIsMobile";
import useNewTxsSocket from "lib/hooks/useNewTxsSocket";
import { TX } from "stubs/tx";
import LinkInternal from "ui/shared/links/LinkInternal";
import SocketNewItemsNotice from "ui/shared/SocketNewItemsNotice";

import LatestTxsItem from "./LatestTxsItem";
import LatestTxsItemMobile from "./LatestTxsItemMobile";

const LatestTransactions = () => {
  const isMobile = useIsMobile();
  const txsCount = isMobile ? 5 : 10;
  const { data, isPlaceholderData, isError } = useApiQuery("homepage_txs", {
    queryOptions: {
      placeholderData: Array(txsCount).fill(TX),
    },
  });

  const { num, socketAlert } = useNewTxsSocket();

  if (isError) {
    return <Text mt={4}>No data. Please reload page.</Text>;
  }

  if (data) {
    const txsUrl = route({ pathname: "/txs" });
    return (
      <>
        <Flex alignItems="flex-end" justifyContent="space-between" gap={5}>
          <Heading
            fontSize={{ base: 16, lg: 20 }}
            lineHeight={{ base: 6, lg: 8 }}
            fontWeight={700}
            color={color.textPrimary}
            fontFamily="inherit"
          >
            Latest Transactions
          </Heading>
          <SocketNewItemsNotice
            borderBottomRadius={0}
            url={txsUrl}
            num={num}
            alert={socketAlert}
            isLoading={isPlaceholderData}
            className="socket-notice"
            fontSize={{ base: 10, md: 14 }}
            style={{
              backgroundColor: "transparent",
              width: "fit-content",
              height: "100%",
              padding: 0,
              color: color.textBlack,
            }}
          />
        </Flex>
        <Box mb={3} display={{ base: "block", lg: "none" }}>
          {data.slice(0, txsCount).map((tx, index) => (
            <LatestTxsItemMobile
              key={tx.hash + (isPlaceholderData ? index : "")}
              tx={tx}
              isLoading={isPlaceholderData}
            />
          ))}
        </Box>
        <AddressHighlightProvider>
          <Box mb={3} display={{ base: "none", lg: "block" }}>
            {data.slice(0, txsCount).map((tx, index) => (
              <LatestTxsItem key={tx.hash + (isPlaceholderData ? index : "")} tx={tx} isLoading={isPlaceholderData} />
            ))}
          </Box>
        </AddressHighlightProvider>
        <Flex justifyContent="center">
          <LinkInternal
            fontSize={12}
            fontWeight={600}
            lineHeight={5}
            href={txsUrl}
            color={color.textBrand}
            _hover={{ opacity: "0.8", color: color.textBrand }}
          >
            <Flex alignItems="center" gap={2}>
              View all transactions
              <SvgDoubleArrowRight />
            </Flex>
          </LinkInternal>
        </Flex>
      </>
    );
  }

  return null;
};

export default LatestTransactions;

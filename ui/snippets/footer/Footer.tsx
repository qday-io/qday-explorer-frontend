import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import NavBar from "ui/shared/layout/components/NavBar";

import { SocialMedia } from "./Footer.const";
import IntTxsIndexingStatus from "./IntTxsIndexingStatus";

const Footer = () => {
  return (
    <Box
      paddingY={{ base: 3, lg: 8 }}
      paddingX={{ base: 3, lg: 6 }}
      borderTop="1px solid"
      borderColor={color.textBlack}
      marginTop={{ base: 4, lg: 0 }}
    >
      <Flex flexDirection={{ base: "column", md: "row" }} gap={{ base: 6, lg: 0 }} justifyContent="space-between">
        <Box
          maxW={{ base: "fit-content", md: "60%", lg: "20%" }}
          paddingRight={{ base: 0, lg: 8 }}
          borderRight={{ base: "none", xl: "1px solid" }}
          style={{ borderColor: color.textBlack }}
        >
          <Box width="fit-content" backgroundColor="transparent">
            <IntTxsIndexingStatus />
          </Box>
          <Box marginTop={{ base: 6, lg: 8 }}>
            <Image src="/static/QDay-Logo.png" alt="logo" />
          </Box>
          <Box marginTop={5}>
            <Text as="p" fontSize={12} lineHeight={5} fontWeight={400}>
              QDay is a post-quantum privacy-preserving Blockchain network, which adopts the NIST standardized
              lattice-based cryptography, and is cryptographically proven secure. Its cryptocurrency ABEL is also
              anonymous and untraceable.
            </Text>
          </Box>
        </Box>
        <Box flex={1} display={{ base: "none", xl: "flex" }} alignItems="center" justifyContent="center">
          <NavBar isShortenMode style={{ border: "none" }} />
        </Box>
        <Box
          maxW={{ base: "fit-content", lg: "20%" }}
          paddingLeft={{ base: 0, lg: 8 }}
          borderLeft={{ base: "none", xl: "1px solid" }}
          style={{ borderColor: color.textBlack }}
          display="flex"
          justifyContent="center"
          alignItems={{ base: "start", lg: "end" }}
          flexDirection="column"
        >
          <Flex gap={2}>
            {SocialMedia.map((item, index) => {
              const Icon = item.logo;
              return (
                <Box key={index}>
                  <Icon width={28} height={28} />
                </Box>
              );
            })}
          </Flex>
          <Box marginTop={4}>
            <Text as="p" fontSize={12} lineHeight={5} fontWeight={500}>
              © 2024 QDay | All rights reserved
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default React.memo(Footer);

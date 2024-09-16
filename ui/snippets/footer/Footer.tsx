import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import NavBar from "ui/shared/layout/components/NavBar";

import { SocialMedia } from "./Footer.const";
import IntTxsIndexingStatus from "./IntTxsIndexingStatus";

const Footer = () => {
  return (
    <Box paddingY={8} paddingX={6} borderTop="1px solid" borderColor={color.textBlack}>
      <Flex>
        <Box
          width={{ base: "20%", xl: "25%", "2xl": "30%" }}
          paddingRight={8}
          borderRight="1px solid"
          borderColor={color.border}
        >
          <Box width="fit-content" backgroundColor="transparent">
            <IntTxsIndexingStatus />
          </Box>
          <Box marginTop={8}>
            <Image src="/static/QDay-Logo.png" alt="logo" />
          </Box>
          <Box marginTop={5}>
            <Text as="p" fontSize={12} lineHeight={5} fontWeight={400}>
              Qday is a post-quantum privacy-preserving Blockchain network, which adopts the NIST standardized
              lattice-based cryptography, and is cryptographically proven secure. Its cryptocurrency ABEL is also
              anonymous and untraceable.
            </Text>
          </Box>
        </Box>
        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <NavBar isShortenMode style={{ border: "none" }} />
        </Box>
        <Box
          width={{ base: "20%", xl: "25%", "2xl": "30%" }}
          paddingLeft={8}
          borderLeft="1px solid"
          borderColor={color.border}
          display="flex"
          justifyContent="center"
          alignItems="end"
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
              © 2024 Qday | All rights reserved
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default React.memo(Footer);

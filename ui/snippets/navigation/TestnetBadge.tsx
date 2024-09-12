import type { BoxProps } from "@chakra-ui/react";
import { Box, chakra, Text } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import config from "configs/app";

type Props = BoxProps;

const TestnetBadge = (props: Props) => {
  if (!config.chain.isTestnet) {
    return null;
  }

  return (
    <Box
      {...props}
      borderRadius={4}
      paddingX={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      padding={1}
      height="fit-content"
      backgroundColor={color.fillOpacityOrange}
    >
      <Text as="span" fontSize={8} lineHeight={3} fontWeight={400} color={color.orange}>
        Testnet
      </Text>
    </Box>
  );
};

export default React.memo(chakra(TestnetBadge));

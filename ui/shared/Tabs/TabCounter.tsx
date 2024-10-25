import type { TextProps } from "@chakra-ui/react";
import { Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";

import getDefaultTransitionProps from "theme/utils/getDefaultTransitionProps";

const COUNTER_OVERLOAD = 50;

type Props = {
  count?: number | null;
  contentProps?: TextProps;
};

const TabCounter = ({ count, contentProps }: Props) => {
  const zeroCountColor = useColorModeValue("blackAlpha.400", "whiteAlpha.400");

  if (count === undefined || count === null) {
    return null;
  }

  return (
    <Text
      as="span"
      color={count > 0 ? "text_secondary" : zeroCountColor}
      ml={1}
      {...getDefaultTransitionProps()}
      {...contentProps}
    >
      {count > COUNTER_OVERLOAD ? `${COUNTER_OVERLOAD}+` : count}
    </Text>
  );
};

export default TabCounter;

import type { BoxProps } from "@chakra-ui/react";
import { Box, Text } from "@chakra-ui/react";
import SvgCheck from "assets/icons/SvgCheck";
import { color } from "enums/colors";
import React from "react";

import type { Transaction } from "types/api/transaction";

export interface Props extends BoxProps {
  status: Transaction["status"];
  errorText?: string | null;
  isLoading?: boolean;
}

const TxStatus = ({ status, errorText, isLoading, ...props }: Props) => {
  if (status === undefined) {
    return null;
  }

  let text;
  let backgroundColor;
  let textColor;
  let Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null = null;

  switch (status) {
    case "ok":
      text = "Success";
      backgroundColor = color.opacityGreen;
      textColor = color.textGreen;
      Icon = SvgCheck;
      break;
    case "error":
      text = "Failed";
      backgroundColor = "";
      textColor = "";
      break;
    case null:
      text = "Pending";
      backgroundColor = "";
      textColor = "";
      break;
  }
  return (
    <Box
      {...props}
      backgroundColor={backgroundColor}
      paddingX={2}
      paddingY={0}
      borderRadius={4}
      border="1px solid"
      borderColor="transparent"
      display="flex"
      justifyItems="center"
      alignItems="center"
      gap={2}
    >
      {Icon && <Icon />}
      <Text as="span" fontSize={{ base: 10, md: 12 }} lineHeight={5} fontWeight={400} color={textColor}>
        {text}
      </Text>
    </Box>
  );
  // return <StatusTag type={ type } text={ text } errorText={ errorText } isLoading={ isLoading }/>;
};

export default TxStatus;

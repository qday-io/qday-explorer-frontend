import type { BoxProps } from "@chakra-ui/react";
import { Box, Skeleton, Text } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { TransactionType } from "types/api/transaction";

export interface Props extends BoxProps {
  types: Array<TransactionType>;
  isLoading?: boolean;
}

const TYPES_ORDER: Array<TransactionType> = [
  "blob_transaction",
  "rootstock_remasc",
  "rootstock_bridge",
  "token_creation",
  "contract_creation",
  "token_transfer",
  "contract_call",
  "coin_transfer",
];

const TxType = ({ types, isLoading, ...props }: Props) => {
  const typeToShow = types.sort((t1, t2) => TYPES_ORDER.indexOf(t1) - TYPES_ORDER.indexOf(t2))[0];

  let label;
  let colorScheme;
  let colorText;

  switch (typeToShow) {
    case "contract_call":
      label = "Contract call";
      colorScheme = color.borderInfo;
      colorText = color.borderInfo;
      break;
    case "blob_transaction":
      label = "Blob txn";
      colorScheme = color.borderGreen;
      colorText = color.borderGreen;
      break;
    case "contract_creation":
      label = "Contract creation";
      colorScheme = color.lightTan;
      colorText = color.lightTan;
      break;
    case "token_transfer":
      label = "Token transfer";
      colorScheme = color.orange;
      colorText = color.orange;
      break;
    case "token_creation":
      label = "Token creation";
      colorScheme = color.borderYellow;
      colorText = color.borderYellow;
      break;
    case "coin_transfer":
      label = "Coin transfer";
      colorScheme = color.aquaGreen;
      colorText = color.aquaGreen;
      break;
    case "rootstock_remasc":
      label = "REMASC";
      colorScheme = color.lightPurple;
      colorText = color.lightPurple;
      break;
    case "rootstock_bridge":
      label = "Bridge";
      colorScheme = color.darkTeal;
      colorText = color.textGreen;
      break;
    default:
      label = "Transaction";
      colorScheme = "purple";
      colorText = "purple";
  }

  return (
    <Box
      border="1px solid"
      borderColor={colorScheme}
      paddingY={0}
      paddingX={2}
      borderRadius={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <Skeleton isLoaded={!isLoading}>
        <Text fontSize={{ base: 10, md: 12 }} lineHeight={5} fontWeight={400} color={colorText} textAlign="center">
          {label}
        </Text>
      </Skeleton>
    </Box>
  );
};

export default TxType;

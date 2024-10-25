import { Box, Text } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { Transaction } from "types/api/transaction";

import * as DetailsInfoItem from "ui/shared/DetailsInfoItem";
import TextSeparator from "ui/shared/TextSeparator";

type Props = Pick<Transaction, "nonce" | "type" | "position">;

const TxDetailsOther = ({ nonce, type, position }: Props) => {
  const labelContentProps = {
    alignItems: "center",
    color: color.textSecondary,
    fontSize: { base: 14, md: 16 },
    fontWeight: 600,
  };

  const valueContentProps = {
    alignItems: "center",
    color: color.textPrimary,
    fontSize: { base: 14, md: 16 },
    fontWeight: 500,
  };

  return (
    <>
      <DetailsInfoItem.Label hint="Other data related to this transaction" contentProps={labelContentProps}>
        Other
      </DetailsInfoItem.Label>
      <DetailsInfoItem.Value contentProps={valueContentProps}>
        {[
          typeof type === "number" && (
            <Box key="type">
              <Text as="span" {...valueContentProps}>
                Txn type:{" "}
              </Text>
              <Text as="span" {...valueContentProps}>
                {type}
              </Text>
              {type === 2 && (
                <Text as="span" ml={1} variant="secondary" {...valueContentProps}>
                  (EIP-1559)
                </Text>
              )}
              {type === 3 && (
                <Text as="span" ml={1} variant="secondary" {...valueContentProps}>
                  (EIP-4844)
                </Text>
              )}
            </Box>
          ),
          <Box key="nonce">
            <Text as="span" {...valueContentProps}>
              Nonce:{" "}
            </Text>
            <Text as="span" {...valueContentProps}>
              {nonce}
            </Text>
          </Box>,
          position !== null && position !== undefined && (
            <Box key="position">
              <Text as="span" {...valueContentProps}>
                Position:{" "}
              </Text>
              <Text as="span" {...valueContentProps}>
                {position}
              </Text>
            </Box>
          ),
        ]
          .filter(Boolean)
          .map((item, index) => (
            <>
              {index !== 0 && <TextSeparator color={color.textBlack} />}
              {item}
            </>
          ))}
      </DetailsInfoItem.Value>
    </>
  );
};

export default TxDetailsOther;

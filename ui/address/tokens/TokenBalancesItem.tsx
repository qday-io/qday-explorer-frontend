import { Box, Flex, Skeleton, Text, useColorModeValue } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

type Props = {
  name: string;
  value: string;
  icon: React.ReactNode;
  valueSecondary?: string;
  isLoading: boolean;
};

const TokenBalancesItem = ({ name, icon, value, valueSecondary, isLoading }: Props) => {
  const bgColor = useColorModeValue("blackAlpha.50", "whiteAlpha.50");

  return (
    <Box px="12px" py="10px" bgColor={bgColor} borderRadius="base">
      <Text variant="secondary" fontSize={{ base: 12, md: 14 }} color={color.textSecondary} fontWeight={600} mb={1}>
        {name}
      </Text>
      <Flex alignItems="center">
        {icon}
        <Skeleton
          isLoaded={!isLoading}
          fontWeight={500}
          color={color.textPrimary}
          fontSize={{ base: 14, md: 16 }}
          whiteSpace="pre-wrap"
          wordBreak="break-word"
          display="flex"
          ml={2}
        >
          {value}
          {Boolean(valueSecondary) && (
            <Text color={color.textSecondary} fontWeight={400} fontSize={{ base: 14, md: 16 }}>
              {" "}
              ({valueSecondary})
            </Text>
          )}
        </Skeleton>
      </Flex>
    </Box>
  );
};

export default React.memo(TokenBalancesItem);

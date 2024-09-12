import { Text, PopoverBody, PopoverContent, PopoverTrigger, Box, Heading, Flex } from "@chakra-ui/react";
import { formatDate } from "date-fns";
import { color } from "enums/colors";
import React from "react";

import type { GasPrices } from "types/api/stats";

import AdditionalInfoButton from "ui/shared/AdditionalInfoButton";
import Popover from "ui/shared/chakra/Popover";
import LinkInternal from "ui/shared/links/LinkInternal";

type Props = {
  isLoading?: boolean;
  className?: string;
  value: GasPrices;
};

const StatisticAdditionalInformation = ({ isLoading, className, value }: Props) => {
  const sectionItemProps = {
    fontSize: 16,
    lineHeight: 6,
    fontWeight: 400,
    color: color.textPrimary,
  };
  const MILLISECONDS_IN_A_SECOND = 1000;

  return (
    <Popover placement="bottom-start" openDelay={300} isLazy>
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <AdditionalInfoButton isOpen={isOpen} isLoading={isLoading} className={className} />
          </PopoverTrigger>
          <PopoverContent border="1px solid" borderColor="divider">
            <PopoverBody fontWeight={400} fontSize="sm">
              <Box>
                <Heading fontFamily="inherit" fontSize={18} lineHeight={7} fontWeight={700} color={color.textPrimary}>
                  Gas tracker
                </Heading>
                <Flex flexDirection="column" gap={1} marginY={5}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize={14} lineHeight={5} fontWeight={400} color={color.textSecondary}>
                      Last update
                    </Text>
                    <Text fontSize={14} lineHeight={5} fontWeight={400} color={color.textSecondary}>
                      {formatDate(new Date(), "PPpp")}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text
                      {...sectionItemProps}
                    >{`Fast ${Number(value.fast?.time ?? 0 / MILLISECONDS_IN_A_SECOND).toLocaleString()}s`}</Text>
                    <Text {...sectionItemProps} fontWeight={700}>
                      {`<${value.fast?.price ?? value.fast} Gwei`}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text
                      {...sectionItemProps}
                    >{`Normal ${Number(value.average?.time ?? 0 / MILLISECONDS_IN_A_SECOND).toLocaleString()}s`}</Text>
                    <Text {...sectionItemProps} fontWeight={700}>
                      {`<${value.average?.price ?? value.average} Gwei`}
                    </Text>
                  </Flex>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text
                      {...sectionItemProps}
                    >{`Slow ${Number(value.slow?.time ?? 0 / MILLISECONDS_IN_A_SECOND).toLocaleString()}s`}</Text>
                    <Text {...sectionItemProps} fontWeight={700}>
                      {`<${value.slow?.price ?? value.slow} Gwei`}
                    </Text>
                  </Flex>
                </Flex>
                <Box height="1px" backgroundColor={color.textBlack} marginBottom={5} />
                <Box>
                  <LinkInternal
                    href="/gas-tracker"
                    color={color.textBrand}
                    fontSize={16}
                    lineHeight={6}
                    fontWeight={600}
                  >
                    Gas tracker overview
                  </LinkInternal>
                </Box>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default StatisticAdditionalInformation;

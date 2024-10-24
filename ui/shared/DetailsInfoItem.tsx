import type { FlexProps, GridItemProps } from "@chakra-ui/react";
import { chakra, GridItem, Flex, Text, Skeleton } from "@chakra-ui/react";
import React from "react";

import * as ContainerWithScrollY from "ui/shared/ContainerWithScrollY";
import Hint from "ui/shared/Hint";

const LabelScrollText = () => (
  <Text fontWeight={500} variant="secondary" fontSize="xs" className="note" align="right">
    Scroll to see more
  </Text>
);

interface LabelProps {
  hint?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  id?: string;
  hasScroll?: boolean;
  style?: React.CSSProperties;
  containerProps?: GridItemProps;
  contentProps?: FlexProps;
}

const Label = chakra(
  ({ hint, children, isLoading, id, className, hasScroll, style, containerProps, contentProps }: LabelProps) => {
    return (
      <GridItem
        id={id}
        className={className}
        py={1}
        lineHeight={{ base: 5, lg: 6 }}
        _notFirst={{ mt: { base: 3, lg: 0 } }}
        {...containerProps}
      >
        <Flex gap={{ base: 3, md: 2 }} alignItems="flex-start" style={style} {...contentProps}>
          {hint && <Hint label={hint} isLoading={isLoading} my={{ lg: "2px" }} />}
          <Skeleton isLoaded={!isLoading} fontWeight={600}>
            {children}
            {hasScroll && <LabelScrollText />}
          </Skeleton>
        </Flex>
      </GridItem>
    );
  }
);

interface ValueProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  contentProps?: GridItemProps;
}

const Value = chakra(({ children, className, style, contentProps }: ValueProps) => {
  return (
    <GridItem
      className={className}
      display="flex"
      alignItems="center"
      flexWrap="wrap"
      rowGap={3}
      pl={{ base: "44px", lg: 0 }}
      py={1}
      lineHeight={{ base: 5, lg: 6 }}
      whiteSpace="nowrap"
      style={style}
      {...contentProps}
    >
      {children}
    </GridItem>
  );
});

const ValueWithScroll = chakra(
  ({ children, gradientHeight, onScrollVisibilityChange, className }: ContainerWithScrollY.Props) => {
    return (
      <Value position="relative">
        <ContainerWithScrollY.default
          className={className}
          gradientHeight={gradientHeight}
          onScrollVisibilityChange={onScrollVisibilityChange}
        >
          {children}
        </ContainerWithScrollY.default>
      </Value>
    );
  }
);

export { Label, Value, ValueWithScroll };

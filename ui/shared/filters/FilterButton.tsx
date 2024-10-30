import type { As } from "@chakra-ui/react";
import { Skeleton, Box, Button, Circle, useColorModeValue } from "@chakra-ui/react";
import SvgFilter from "assets/icons/SvgFilter";
import { color } from "enums/colors";
import React from "react";

interface Props {
  isActive?: boolean;
  isLoading?: boolean;
  appliedFiltersNum?: number;
  onClick: () => void;
  as?: As;
}

const FilterButton = (
  { isActive, isLoading, appliedFiltersNum, onClick, as }: Props,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const badgeColor = useColorModeValue("white", "black");
  const badgeBgColor = useColorModeValue("blue.700", "gray.50");

  if (isLoading) {
    return <Skeleton w={{ base: 9, lg: "78px" }} h={8} borderRadius="base" flexShrink={0} />;
  }

  const num = (
    <Circle className="AppliedFiltersNum" bg={isActive ? "link_hovered" : badgeBgColor} size={5} color={badgeColor}>
      {appliedFiltersNum}
    </Circle>
  );

  return (
    <Button
      ref={ref}
      rightIcon={appliedFiltersNum ? num : undefined}
      size="sm"
      fontWeight="500"
      variant="outline"
      colorScheme="gray"
      onClick={onClick}
      isActive={isActive}
      data-selected={Boolean(appliedFiltersNum)}
      padding={3}
      flexShrink={0}
      color={color.textSecondary}
      as={as}
      pointerEvents="all"
      _hover={
        isActive
          ? {
              color: "link_hovered",
              ".AppliedFiltersNum": {
                bg: "link_hovered",
              },
              svg: {
                fill: "link_hovered",
              },
            }
          : undefined
      }
    >
      <SvgFilter />
      <Box display={{ base: "none", lg: "block" }} marginLeft={2} fontSize={{ base: 12, md: 16 }}>
        Filter
      </Box>
    </Button>
  );
};

export default React.forwardRef(FilterButton);

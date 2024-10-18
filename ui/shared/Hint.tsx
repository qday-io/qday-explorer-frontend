import type { TooltipProps } from "@chakra-ui/react";
import { chakra, IconButton, Tooltip, useDisclosure, Skeleton } from "@chakra-ui/react";
import SvgInformation from "assets/icons/SvgInformation";
import { color } from "enums/colors";
import React from "react";

import useIsMobile from "lib/hooks/useIsMobile";

interface Props {
  label: string | React.ReactNode;
  className?: string;
  tooltipProps?: Partial<TooltipProps>;
  isLoading?: boolean;
}

const Hint = ({ label, className, tooltipProps, isLoading }: Props) => {
  // have to implement controlled tooltip because of the issue - https://github.com/chakra-ui/chakra-ui/issues/7107
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();

  const isMobile = useIsMobile();

  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onToggle();
    },
    [onToggle]
  );

  if (isLoading) {
    return <Skeleton className={className} boxSize={5} borderRadius="sm" />;
  }

  return (
    <Tooltip
      label={label}
      placement="top"
      maxW={{ base: "calc(100vw - 32px)", lg: "320px" }}
      isOpen={isOpen}
      backgroundColor={color.fillBackgroundBlack}
      color={color.textPrimary}
      {...tooltipProps}
    >
      <IconButton
        colorScheme="none"
        aria-label="hint"
        icon={<SvgInformation width={isMobile ? 16 : 20} height={isMobile ? 16 : 20} fill={color.textSecondary} />}
        boxSize={5}
        variant="simple"
        display="inline-block"
        flexShrink={0}
        className={className}
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        onClick={handleClick}
        width="fit-content"
        height="fit-content"
        padding={2}
        borderRadius={4}
        _hover={{
          svg: { fill: color.textBrand },
          backgroundColor: color.fillOpacityBrand,
        }}
      />
    </Tooltip>
  );
};

export default React.memo(chakra(Hint));

import { chakra, Button, Skeleton } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import IconSvg from "ui/shared/IconSvg";

interface Props {
  isOpen?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

const AdditionalInfoButton = (
  { isOpen, onClick, className, isLoading }: Props,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  if (isLoading) {
    return <Skeleton boxSize={6} borderRadius="sm" flexShrink={0} />;
  }

  return (
    <Button
      variant="unstyled"
      display="inline-flex"
      alignItems="center"
      className={className}
      ref={ref}
      background={isOpen ? color.fillOpacityBrand : "unset"}
      borderRadius="4px"
      w="24px"
      h="24px"
      onClick={onClick}
      cursor="pointer"
      flexShrink={0}
      aria-label="Transaction info"
    >
      <IconSvg
        name="info"
        boxSize={5}
        color={isOpen ? color.textBrand : "icon_info"}
        _hover={{ color: color.textBrand }}
      />
    </Button>
  );
};

export default chakra(React.forwardRef(AdditionalInfoButton));

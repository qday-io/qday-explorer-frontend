import { chakra, Button, Skeleton } from "@chakra-ui/react";
import SvgInformation from "assets/icons/SvgInformation";
import { color } from "enums/colors";
import React from "react";

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
      _hover={{ svg: { fill: color.textBrand }, background: color.fillOpacityBrand }}
    >
      <SvgInformation width={16} height={16} fill={isOpen ? color.textBrand : color.textSecondary} />
    </Button>
  );
};

export default chakra(React.forwardRef(AdditionalInfoButton));

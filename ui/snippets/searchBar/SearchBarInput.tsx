import { InputGroup, Input, chakra, useColorModeValue, forwardRef, InputRightElement } from "@chakra-ui/react";
import { color } from "enums/colors";
import throttle from "lodash/throttle";
import React from "react";
import type { ChangeEvent, FormEvent, FocusEvent } from "react";

import { useScrollDirection } from "lib/contexts/scrollDirection";
import useIsMobile from "lib/hooks/useIsMobile";
import ClearButton from "ui/shared/ClearButton";
import IconSvg from "ui/shared/IconSvg";

interface Props {
  onChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBlur?: (event: FocusEvent<HTMLFormElement>) => void;
  onFocus?: () => void;
  onHide?: () => void;
  onClear: () => void;
  isHomepage?: boolean;
  isSuggestOpen?: boolean;
  value: string;
  style?: React.CSSProperties;
}

const SearchBarInput = (
  { onChange, onSubmit, isHomepage, isSuggestOpen, onFocus, onBlur, onHide, value, style, onClear }: Props,
  ref: React.ForwardedRef<HTMLFormElement>
) => {
  const innerRef = React.useRef<HTMLFormElement>(null);
  React.useImperativeHandle(ref, () => innerRef.current as HTMLFormElement, []);
  const [isSticky, setIsSticky] = React.useState(false);
  const scrollDirection = useScrollDirection();
  const isMobile = useIsMobile();

  const handleScroll = React.useCallback(() => {
    const TOP_BAR_HEIGHT = 36;
    if (!isHomepage) {
      if (window.scrollY >= TOP_BAR_HEIGHT) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
    const clientRect = isMobile && innerRef?.current?.getBoundingClientRect();
    if (clientRect && clientRect.y < TOP_BAR_HEIGHT) {
      onHide?.();
    }
  }, [isMobile, onHide, isHomepage]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  React.useEffect(() => {
    if (!isMobile) {
      return;
    }
    const throttledHandleScroll = throttle(handleScroll, 300);

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [isMobile, handleScroll]);

  const transformMobile = scrollDirection !== "down" ? "translateY(0)" : "translateY(-100%)";
  const iconColor = useColorModeValue("blackAlpha.600", "whiteAlpha.600");

  return (
    <chakra.form
      ref={innerRef}
      noValidate
      onSubmit={onSubmit}
      onBlur={onBlur}
      onFocus={onFocus}
      w="100%"
      backgroundColor="transparent"
      borderRadius={{ base: isHomepage ? "base" : "none", lg: "base" }}
      position={{ base: isHomepage ? "static" : "absolute", lg: "relative" }}
      top={{ base: isHomepage ? 0 : 55, lg: 0 }}
      left="0"
      zIndex={{ base: isHomepage ? "auto" : "-1", lg: isSuggestOpen ? "popover" : "auto" }}
      paddingX={{ base: isHomepage ? 0 : 3, lg: 0 }}
      paddingTop={{ base: isHomepage ? 0 : 1, lg: 0 }}
      paddingBottom={{ base: isHomepage ? 0 : 2, lg: 0 }}
      boxShadow={scrollDirection !== "down" && isSticky ? "md" : "none"}
      transform={{ base: isHomepage ? "none" : transformMobile, lg: "none" }}
      transitionProperty="transform,box-shadow,background-color,color,border-color"
      transitionDuration="normal"
      transitionTimingFunction="ease"
    >
      <InputGroup>
        <InputRightElement
          w={{ base: 4, lg: 6 }}
          mr={{ base: isHomepage ? 2 : 3, lg: 5 }}
          ml={{ base: 3, lg: 0 }}
          h="100%"
        >
          <IconSvg name="search" boxSize={{ base: 4, lg: 6 }} color={iconColor} />
        </InputRightElement>

        <Input
          pl={{ base: isHomepage ? "20px" : "38px", lg: "20px" }}
          sx={{
            "@media screen and (max-width: 999px)": {
              paddingLeft: isHomepage ? "8px" : "12px",
              paddingRight: "36px",
            },
            "@media screen and (min-width: 1001px)": {
              paddingRight: "36px",
            },
          }}
          py={{ base: 2, lg: 5 }}
          fontSize={{ base: "12px", lg: "16px" }}
          overflow="hidden"
          height={{ base: "fit-content", lg: "60px" }}
          style={style}
          borderRadius={{ base: 8, lg: 12 }}
          placeholder="Search by Address / Txn Hash / Block / Token / Domain Name... "
          onChange={handleChange}
          border={isHomepage ? "1px solid" : "2px solid"}
          borderColor={useColorModeValue("blackAlpha.100", "whiteAlpha.200")}
          _focusWithin={{ _placeholder: { color: color.textBlack } }}
          color={useColorModeValue("black", "white")}
          _placeholder={{
            color: color.textBlack,
          }}
          value={value}
        />
        {!isHomepage && value && (
          <InputRightElement top={{ base: 2, lg: isHomepage ? 3 : 2 }} right={2}>
            <ClearButton onClick={onClear} />
          </InputRightElement>
        )}
      </InputGroup>
    </chakra.form>
  );
};

export default React.memo(forwardRef(SearchBarInput));

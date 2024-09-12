import type { TextProps } from "@chakra-ui/react";
import { HStack, PopoverBody, PopoverContent, PopoverTrigger, chakra, StackDivider, Text } from "@chakra-ui/react";
import { color as colorEnum } from "enums/colors";
import React from "react";

import type { NavGroupItem } from "types/client/navigation";

import getDefaultTransitionProps from "theme/utils/getDefaultTransitionProps";
import Popover from "ui/shared/chakra/Popover";
import IconSvg from "ui/shared/IconSvg";

import LightningLabel from "../LightningLabel";
import useColors from "../useColors";
import { checkRouteHighlight } from "../utils";
import NavLink from "./NavLink";
interface Props extends TextProps {
  item: NavGroupItem;
}

const NavLinkGroup = ({ item, ...props }: Props) => {
  const colors = useColors();
  const bgColor = item.isActive ? colors.bg.active : colors.bg.default;
  const color = item.isActive ? colors.text.active : colors.text.default;

  const isHighlighted = checkRouteHighlight(item.subItems);
  const hasGroups = item.subItems.some((subItem) => Array.isArray(subItem));

  return (
    <Popover trigger="hover" placement="bottom" isLazy gutter={8}>
      {({ isOpen }) => (
        <>
          <PopoverTrigger>
            <Text
              as="span"
              listStyleType="none"
              display="flex"
              alignItems="center"
              px={2}
              py={1.5}
              fontSize="sm"
              lineHeight={5}
              fontWeight={500}
              cursor="pointer"
              color={isOpen ? colors.text.hover : color}
              _hover={{ color: colors.text.hover }}
              bgColor={bgColor}
              borderRadius="base"
              {...getDefaultTransitionProps()}
              {...props}
            >
              {item.text}
              {isHighlighted && <LightningLabel iconColor={bgColor} position={{ lg: "static" }} ml={{ lg: "2px" }} />}
              <IconSvg name="arrows/east-mini" boxSize={5} transform="rotate(-90deg)" ml={1} />
            </Text>
          </PopoverTrigger>
          <PopoverContent
            w="fit-content"
            borderRadius={{ xl: "6px" }}
            border="1px solid"
            borderColor={colorEnum.textBlack}
            overflow="hidden"
            backgroundColor={colorEnum.bgPopup}
          >
            <PopoverBody p={0}>
              {hasGroups ? (
                <HStack divider={<StackDivider borderColor="divider" />} alignItems="flex-start">
                  {item.subItems.map((subItem, index) => {
                    if (!Array.isArray(subItem)) {
                      return <NavLink key={subItem.text} item={subItem} />;
                    }

                    return (
                      <chakra.ul key={index} display="flex" flexDir="column" rowGap={1}>
                        {subItem.map((navItem) => (
                          <NavLink key={navItem.text} item={navItem} />
                        ))}
                      </chakra.ul>
                    );
                  })}
                </HStack>
              ) : (
                <chakra.ul display="flex" flexDir="column" rowGap={1}>
                  {item.subItems.map((subItem) => {
                    if (Array.isArray(subItem)) {
                      return null;
                    }
                    return (
                      <NavLink
                        key={subItem.text}
                        item={subItem}
                        style={{
                          padding: "8px 12px",
                          borderBottom: "1px solid",
                          borderColor: colorEnum.textBlack,
                          borderRadius: 0,
                          fontSize: 14,
                          lineHeight: "20px",
                          color: colorEnum.textPrimary,
                          fontWeight: 400,
                        }}
                        _hover={{
                          color: `${colorEnum.textBrand} !important`,
                        }}
                      />
                    );
                  })}
                </chakra.ul>
              )}
            </PopoverBody>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
};

export default React.memo(NavLinkGroup);

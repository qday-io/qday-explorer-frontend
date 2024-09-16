import { chakra, Flex } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import config from "configs/app";
import useNavItems, { isGroupItem } from "lib/hooks/useNavItems";
import NetworkLogo from "ui/snippets/networkMenu/NetworkLogo";
import ProfileMenuDesktop from "ui/snippets/profileMenu/ProfileMenuDesktop";
import Settings from "ui/snippets/topBar/settings/Settings";
import WalletMenuDesktop from "ui/snippets/walletMenu/WalletMenuDesktop";

import TestnetBadge from "../TestnetBadge";
import NavLink from "./NavLink";
import NavLinkGroup from "./NavLinkGroup";

type NavigationDesktopProps = {
  isShortenMode?: boolean;
  style?: React.CSSProperties;
};

const NavigationDesktop = ({ isShortenMode = false, style }: NavigationDesktopProps) => {
  const { mainNavItems } = useNavItems();

  return (
    <Flex
      display={{ base: "none", lg: "flex" }}
      alignItems="center"
      px={6}
      py={2}
      borderBottomWidth="1px"
      borderColor="divider"
      justifyContent="space-between"
      height="64px"
      style={style}
    >
      {!isShortenMode && (
        <Flex alignItems="center">
          <NetworkLogo isCollapsed={false} w={{ lg: "auto" }} isCustomize />
          <TestnetBadge ml={2} />
        </Flex>
      )}
      <chakra.nav>
        <Flex as="ul" columnGap={3}>
          {mainNavItems.map((item) => {
            if (isGroupItem(item)) {
              return (
                <NavLinkGroup
                  key={item.text}
                  item={item}
                  color={color.textSecondary}
                  paddingX={5}
                  paddingY={2}
                  fontSize={14}
                  lineHeight={5}
                  fontWeight={500}
                  _hover={{ backgroundColor: color.fillBackgroundMenuHighlight, color: color.textSecondary }}
                />
              );
            } else {
              return (
                <NavLink
                  key={item.text}
                  item={item}
                  noIcon
                  py={1.5}
                  w="fit-content"
                  color={color.textSecondary}
                  paddingX={5}
                  paddingY={2}
                  fontSize={14}
                  lineHeight={5}
                  fontWeight={500}
                  _hover={{ backgroundColor: color.fillBackgroundMenuHighlight, color: color.textSecondary }}
                />
              );
            }
          })}
        </Flex>
      </chakra.nav>
      {!isShortenMode && <Settings />}
      {config.features.account.isEnabled && <ProfileMenuDesktop buttonBoxSize="32px" />}
      {config.features.blockchainInteraction.isEnabled && <WalletMenuDesktop size="sm" />}
    </Flex>
  );
};

export default React.memo(NavigationDesktop);

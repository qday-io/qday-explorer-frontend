import { Box, Image, useColorModeValue, Skeleton, chakra, Heading } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import { route } from "nextjs-routes";

import config from "configs/app";
import IconSvg from "ui/shared/IconSvg";

interface Props {
  isCollapsed?: boolean;
  onClick?: (event: React.SyntheticEvent) => void;
  className?: string;
  isCustomize?: boolean;
}

const LogoFallback = ({ isCollapsed, isSmall }: { isCollapsed?: boolean; isSmall?: boolean }) => {
  const field = isSmall ? "icon" : "logo";
  const logoColor = useColorModeValue("blue.600", "white");

  const display = isSmall
    ? {
        base: "none",
        lg: isCollapsed === false ? "none" : "block",
        xl: isCollapsed ? "block" : "none",
      }
    : {
        base: "block",
        lg: isCollapsed === false ? "block" : "none",
        xl: isCollapsed ? "none" : "block",
      };

  if (config.UI.navigation[field].default) {
    return <Skeleton w="100%" borderRadius="sm" display={display} />;
  }

  return (
    <IconSvg
      name={isSmall ? "networks/icon-placeholder" : "networks/logo-placeholder"}
      width="auto"
      height="100%"
      color={logoColor}
      display={display}
    />
  );
};

const NetworkLogo = ({ isCollapsed, onClick, className, isCustomize }: Props) => {
  const logoSrc = useColorModeValue(
    config.UI.navigation.logo.default,
    config.UI.navigation.logo.dark || config.UI.navigation.logo.default
  );
  const iconSrc = useColorModeValue(
    config.UI.navigation.icon.default,
    config.UI.navigation.icon.dark || config.UI.navigation.icon.default
  );
  const darkModeFilter = { filter: "brightness(0) invert(1)" };
  const logoStyle = useColorModeValue({}, !config.UI.navigation.logo.dark ? darkModeFilter : {});
  const iconStyle = useColorModeValue({}, !config.UI.navigation.icon.dark ? darkModeFilter : {});

  return (
    <Box
      className={className}
      as="a"
      href={route({ pathname: "/" })}
      width={
        isCustomize
          ? {}
          : { base: "auto", lg: isCollapsed === false ? "auto" : "30px", xl: isCollapsed ? "30px" : "auto" }
      }
      height={
        isCustomize
          ? {}
          : { base: "24px", lg: isCollapsed === false ? "24px" : "30px", xl: isCollapsed ? "30px" : "24px" }
      }
      display="inline-flex"
      overflow="hidden"
      onClick={onClick}
      flexShrink={0}
      aria-label="Link to main page"
    >
      {/* big logo */}
      {logoSrc ? (
        <Image
          w="auto"
          h="100%"
          src={logoSrc}
          alt={`${config.chain.name} network logo`}
          fallback={<LogoFallback isCollapsed={isCollapsed} />}
          display={{ base: "block", lg: isCollapsed === false ? "block" : "none", xl: isCollapsed ? "none" : "block" }}
          style={logoStyle}
        />
      ) : (
        <Heading
          fontSize={{ base: 16, lg: 24 }}
          lineHeight={{ base: 6, lg: 8 }}
          fontWeight={700}
          color={{ base: color.textPrimary, lg: color.textBrand }}
          fontFamily="inherit"
        >
          QDay Explorer
        </Heading>
      )}

      {/* small logo */}
      <Image
        w="auto"
        h="100%"
        src={iconSrc}
        alt={`${config.chain.name} network logo`}
        fallback={<LogoFallback isCollapsed={isCollapsed} isSmall />}
        display={{ base: "none", lg: isCollapsed === false ? "none" : "block", xl: isCollapsed ? "block" : "none" }}
        style={iconStyle}
      />
    </Box>
  );
};

export default React.memo(chakra(NetworkLogo));

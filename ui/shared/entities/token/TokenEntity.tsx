import type { ChakraProps } from "@chakra-ui/react";
import { Box, Image, Skeleton, chakra } from "@chakra-ui/react";
import SvgToken from "assets/icons/SvgToken";
import _omit from "lodash/omit";
import React from "react";

import type { TokenInfo } from "types/api/token";

import { route } from "nextjs-routes";

import * as EntityBase from "ui/shared/entities/base/components";
import TokenLogoPlaceholder from "ui/shared/TokenLogoPlaceholder";
import TruncatedTextTooltip from "ui/shared/TruncatedTextTooltip";

import { getIconProps } from "../base/utils";

type LinkProps = EntityBase.LinkBaseProps & Pick<EntityProps, "token">;

const Link = chakra((props: LinkProps) => {
  const defaultHref = route({ pathname: "/token/[hash]", query: { ...props.query, hash: props.token.address } });

  return (
    <EntityBase.Link {...props} href={props.href ?? defaultHref}>
      {props.children}
    </EntityBase.Link>
  );
});

type IconProps = Pick<EntityProps, "token" | "isLoading" | "iconSize" | "noIcon" | "className"> & {
  marginRight?: ChakraProps["marginRight"];
  boxSize?: ChakraProps["boxSize"];
  isCustomize?: boolean;
  iconStyle?: React.CSSProperties;
};

const Icon = (props: IconProps) => {
  if (props.noIcon) {
    return null;
  }

  const styles = {
    marginRight: props.marginRight ?? 2,
    boxSize: props.boxSize ?? getIconProps(props.iconSize).boxSize,
    borderRadius: "base",
    flexShrink: 0,
  };

  if (props.isLoading) {
    return <Skeleton {...styles} className={props.className} />;
  }

  return (
    <Box style={props.iconStyle}>
      {props.isCustomize ? (
        <SvgToken />
      ) : (
        <Image
          {...styles}
          borderRadius={props.token.type === "ERC-20" ? "full" : "base"}
          className={props.className}
          src={props.token.icon_url ?? undefined}
          alt={`${props.token.name || "token"} logo`}
          fallback={<TokenLogoPlaceholder {...styles} />}
          fallbackStrategy={props.token.icon_url ? "onError" : "beforeLoadOrError"}
        />
      )}
    </Box>
  );
};

type ContentProps = Omit<EntityBase.ContentBaseProps, "text"> &
  Pick<EntityProps, "token" | "jointSymbol" | "onlySymbol"> & {
    style?: React.CSSProperties;
  };

const Content = chakra((props: ContentProps) => {
  const nameString = [
    !props.onlySymbol && (props.token.name ?? "Unnamed token"),
    props.onlySymbol && (props.token.symbol ?? props.token.name ?? "Unnamed token"),
    props.token.symbol && props.jointSymbol && !props.onlySymbol && `(${props.token.symbol})`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <TruncatedTextTooltip label={nameString}>
      <Skeleton
        isLoaded={!props.isLoading}
        display="inline-block"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        height="fit-content"
        style={props.style}
      >
        {nameString}
      </Skeleton>
    </TruncatedTextTooltip>
  );
});

type SymbolProps = Pick<EntityProps, "token" | "isLoading" | "noSymbol" | "jointSymbol" | "onlySymbol">;

const Symbol = (props: SymbolProps) => {
  const symbol = props.token.symbol;

  if (!symbol || props.noSymbol || props.jointSymbol || props.onlySymbol) {
    return null;
  }

  return (
    <Skeleton
      isLoaded={!props.isLoading}
      display="inline-flex"
      alignItems="center"
      maxW="20%"
      ml={2}
      color="text_secondary"
    >
      <div>(</div>
      <TruncatedTextTooltip label={symbol}>
        <chakra.span
          display="inline-block"
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          height="fit-content"
        >
          {symbol}
        </chakra.span>
      </TruncatedTextTooltip>
      <div>)</div>
    </Skeleton>
  );
};

type CopyProps = Omit<EntityBase.CopyBaseProps, "text"> & Pick<EntityProps, "token">;

const Copy = (props: CopyProps) => {
  return <EntityBase.Copy {...props} text={props.token.address} />;
};

const Container = EntityBase.Container;

export interface EntityProps extends EntityBase.EntityBaseProps {
  token: Pick<TokenInfo, "address" | "icon_url" | "name" | "symbol" | "type">;
  noSymbol?: boolean;
  jointSymbol?: boolean;
  onlySymbol?: boolean;
  style?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  isCustomize?: boolean;
}

const TokenEntity = (props: EntityProps) => {
  const linkProps = _omit(props, ["className"]);
  const partsProps = _omit(props, ["className", "onClick"]);

  return (
    <Container className={props.className} w="100%">
      <Icon style={props.iconStyle} isCustomize={props.isCustomize} {...partsProps} />
      <Link {...linkProps}>
        <Content {...partsProps} style={props.style} />
      </Link>
      <Symbol {...partsProps} />
      <Copy {...partsProps} />
    </Container>
  );
};

export default React.memo(chakra(TokenEntity));

export { Container, Link, Icon, Content, Copy };

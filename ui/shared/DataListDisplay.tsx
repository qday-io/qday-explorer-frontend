import type { TextProps } from "@chakra-ui/react";
import { Box, Text, chakra } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import EmptySearchResult from "ui/shared/EmptySearchResult";

import DataFetchAlert from "./DataFetchAlert";

type FilterProps = {
  hasActiveFilters: boolean;
  emptyFilteredText: string;
};

type Props = {
  isError: boolean;
  items?: Array<unknown>;
  emptyText: React.ReactNode;
  actionBar?: React.ReactNode;
  showActionBarIfEmpty?: boolean;
  content: React.ReactNode;
  className?: string;
  filterProps?: FilterProps;
  emptyProps?: TextProps;
};

const DataListDisplay = (props: Props) => {
  if (props.isError) {
    return <DataFetchAlert className={props.className} />;
  }

  if (props.filterProps?.hasActiveFilters && !props.items?.length) {
    return (
      <Box className={props.className}>
        {props.actionBar}
        <EmptySearchResult text={props.filterProps.emptyFilteredText} />
      </Box>
    );
  }

  if (!props.items?.length) {
    return (
      <>
        {props.showActionBarIfEmpty && props.actionBar}
        {props.emptyText && (
          <Text
            className={props.className}
            fontSize={{ base: 12, md: 16 }}
            fontWeight={400}
            color={color.textSecondary}
            {...props.emptyProps}
          >
            {props.emptyText}
          </Text>
        )}
      </>
    );
  }

  return (
    <Box className={props.className}>
      {props.actionBar}
      {props.content}
    </Box>
  );
};

export default chakra(DataListDisplay);

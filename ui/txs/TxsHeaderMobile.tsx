import type { BoxProps } from "@chakra-ui/react";
import { Box, HStack, chakra } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { TransactionsSortingValue } from "types/api/transaction";
import type { PaginationParams } from "ui/shared/pagination/types";

// import FilterInput from 'ui/shared/filters/FilterInput';

import useIsMobile from "lib/hooks/useIsMobile";
import ActionBar from "ui/shared/ActionBar";
import * as SocketNewItemsNotice from "ui/shared/SocketNewItemsNotice";
import Sort from "ui/shared/sort/Sort";

import { SORT_OPTIONS } from "./useTxsSort";

// import TxsFilters from './TxsFilters';

type Props = {
  sorting: TransactionsSortingValue | undefined;
  setSorting: (val: TransactionsSortingValue | undefined) => void;
  paginationProps: PaginationParams;
  className?: string;
  showPagination?: boolean;
  filterComponent?: React.ReactNode;
  linkSlot?: React.ReactNode;
  socketInfoAlert?: string;
  socketInfoNum?: number;
  isLoading: boolean;
  containerProps?: BoxProps;
};

const TxsHeaderMobile = ({
  filterComponent,
  sorting,
  setSorting,
  paginationProps,
  className,
  linkSlot,
  socketInfoAlert,
  socketInfoNum,
  isLoading,
  containerProps,
}: Props) => {
  const isMobile = useIsMobile();
  return (
    <ActionBar className={className}>
      <Box {...containerProps}>
        <HStack>
          {filterComponent}
          <Sort
            name="transactions_sorting"
            defaultValue={sorting}
            options={SORT_OPTIONS}
            onChange={setSorting}
            isLoading={paginationProps.isLoading}
          />
          {/* api is not implemented */}
          {/* <FilterInput
          // eslint-disable-next-line react/jsx-no-bind
          onChange={ () => {} }
          maxW="360px"
          size="xs"
          placeholder="Search by addresses, hash, method..."
        /> */}
          {linkSlot}
        </HStack>
        {isMobile && (
          <SocketNewItemsNotice.Mobile
            url={window.location.href}
            num={socketInfoNum}
            alert={socketInfoAlert}
            isLoading={isLoading}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: color.textBlack,
              width: "fit-content",
            }}
          />
        )}
      </Box>

      {/* { showPagination && <Pagination { ...paginationProps }/> } */}
    </ActionBar>
  );
};

export default chakra(TxsHeaderMobile);

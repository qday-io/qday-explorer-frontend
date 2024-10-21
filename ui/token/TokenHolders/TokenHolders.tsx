import { Box } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import type { TokenInfo } from "types/api/token";

import useIsMounted from "lib/hooks/useIsMounted";
import DataFetchAlert from "ui/shared/DataFetchAlert";
import DataListDisplay from "ui/shared/DataListDisplay";
import type { QueryWithPagesResult } from "ui/shared/pagination/useQueryWithPages";

import TokenHoldersList from "./TokenHoldersList";
import TokenHoldersTable from "./TokenHoldersTable";

const TABS_HEIGHT = 88;

type Props = {
  token?: TokenInfo;
  holdersQuery: QueryWithPagesResult<"token_holders">;
  shouldRender?: boolean;
};

const TokenHoldersContent = ({ holdersQuery, token, shouldRender = true }: Props) => {
  const isMounted = useIsMounted();

  if (!isMounted || !shouldRender) {
    return null;
  }

  if (holdersQuery.isError) {
    return <DataFetchAlert />;
  }

  // const actionBar = isMobile && holdersQuery.pagination.isVisible && (
  //   <ActionBar mt={-6}>
  //     <AddressCsvExportLink
  //       address={token?.address}
  //       params={{ type: "holders" }}
  //       isLoading={holdersQuery.pagination.isLoading}
  //     />
  //   </ActionBar>
  // );

  const items = holdersQuery.data?.items;

  const content =
    items && token ? (
      <>
        <Box display={{ base: "none", lg: "block" }}>
          <TokenHoldersTable
            data={items}
            token={token}
            top={holdersQuery.pagination.isVisible ? TABS_HEIGHT : 0}
            isLoading={holdersQuery.isPlaceholderData}
            tHeadStyle={{ backgroundColor: color.popupHeader }}
          />
        </Box>
        <Box display={{ base: "block", lg: "none" }}>
          <TokenHoldersList data={items} token={token} isLoading={holdersQuery.isPlaceholderData} />
        </Box>
      </>
    ) : null;

  return (
    <DataListDisplay
      isError={holdersQuery.isError}
      items={holdersQuery.data?.items}
      emptyText="There are no holders for this token."
      content={content}
    />
  );
};

export default TokenHoldersContent;

import { Show, Hide } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import useIsMobile from "lib/hooks/useIsMobile";
import ActionBar from "ui/shared/ActionBar";
import DataListDisplay from "ui/shared/DataListDisplay";
import Pagination from "ui/shared/pagination/Pagination";
import type { QueryWithPagesResult } from "ui/shared/pagination/useQueryWithPages";

import ERC20TokensListItem from "./ERC20TokensListItem";
import ERC20TokensTable from "./ERC20TokensTable";

type Props = {
  tokensQuery: QueryWithPagesResult<"address_tokens">;
};

const ERC20Tokens = ({ tokensQuery }: Props) => {
  const isMobile = useIsMobile();

  const { isError, isPlaceholderData, data, pagination } = tokensQuery;

  const actionBar = isMobile && pagination.isVisible && (
    <ActionBar mt={-6}>
      <Pagination ml="auto" {...pagination} />
    </ActionBar>
  );

  const content = data?.items ? (
    <>
      <Hide below="lg" ssr={false}>
        <ERC20TokensTable data={data.items} top={pagination.isVisible ? 72 : 0} isLoading={isPlaceholderData} />
      </Hide>
      <Show below="lg" ssr={false}>
        {data.items.map((item, index) => (
          <ERC20TokensListItem
            key={item.token.address + (isPlaceholderData ? index : "")}
            {...item}
            isLoading={isPlaceholderData}
          />
        ))}
      </Show>
    </>
  ) : null;

  return (
    <DataListDisplay
      isError={isError}
      items={data?.items}
      emptyText="There are no token transfers."
      content={content}
      actionBar={actionBar}
      emptyProps={{
        color: color.textSecondary,
        fontSize: { base: 12, md: 18 },
        fontWeight: { base: 400, md: 500 },
      }}
    />
  );
};

export default ERC20Tokens;

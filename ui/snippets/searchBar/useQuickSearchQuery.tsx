import React from 'react';

import type { SearchResultItem } from 'types/api/search';

import config from 'configs/app';
import multichainConfig from 'configs/multichain';
import { isBech32Address, fromBech32Address } from 'lib/address/bech32';
import useApiQuery from 'lib/api/useApiQuery';
import useDebounce from 'lib/hooks/useDebounce';
import { getExternalSearchItem } from 'lib/search/externalSearch';

import useSearchMultichain from './useSearchMultichain';

// Normalize search results to handle different backend field names
// Some backends return 'address' instead of 'address_hash'
const normalizeSearchResults = (data: Array<SearchResultItem>): Array<SearchResultItem> => {
  return data.map(item => {
    if ('address' in item && !('address_hash' in item && item.address_hash)) {
      return { ...item, address_hash: (item as { address?: string }).address || '' };
    }
    return item;
  });
};

export default function useQuickSearchQuery() {
  const [ searchTerm, setSearchTerm ] = React.useState('');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const isMultichain = React.useMemo(() => {
    return Boolean(multichainConfig());
  }, []);

  const mainQuery = useApiQuery('general:quick_search', {
    queryParams: { q: isBech32Address(debouncedSearchTerm) ? fromBech32Address(debouncedSearchTerm) : debouncedSearchTerm },
    queryOptions: {
      enabled: debouncedSearchTerm.trim().length > 0 && !isMultichain,
      select: normalizeSearchResults,
    },
  });

  const multichainQuery = useSearchMultichain({ searchTerm: debouncedSearchTerm, enabled: isMultichain });

  const redirectCheckQuery = useApiQuery('general:search_check_redirect', {
    // on pages with regular search bar we check redirect on every search term change
    // in order to prepend its result to suggest list since this resource is much faster than regular search
    queryParams: { q: debouncedSearchTerm },
    queryOptions: { enabled: Boolean(debouncedSearchTerm) && !isMultichain },
  });

  const zetaChainCCTXQuery = useApiQuery('zetachain:transactions', {
    queryParams: {
      hash: debouncedSearchTerm,
      limit: 10,
      offset: 0,
      direction: 'DESC',
    },
    queryOptions: { enabled: debouncedSearchTerm.trim().length > 0 && config.features.zetachain.isEnabled },
  });

  const query = isMultichain ? multichainQuery : mainQuery;

  return React.useMemo(() => ({
    searchTerm,
    debouncedSearchTerm,
    handleSearchTermChange: setSearchTerm,
    query,
    redirectCheckQuery,
    externalSearchItem: getExternalSearchItem(debouncedSearchTerm),
    zetaChainCCTXQuery,
  }), [ debouncedSearchTerm, query, redirectCheckQuery, searchTerm, zetaChainCCTXQuery ]);
}

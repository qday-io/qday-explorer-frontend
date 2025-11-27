import useApiQuery from 'lib/api/useApiQuery';
import { useAppContext } from 'lib/contexts/app';
import { getTokenIconUrl } from 'lib/token/tokenIconMap';
import * as tokenStubs from 'stubs/token';

export default function useTokenQuery(hash: string) {
  const { apiData } = useAppContext<'/token/[hash]'>();

  return useApiQuery('general:token', {
    pathParams: { hash },
    queryOptions: {
      enabled: Boolean(hash),
      placeholderData: tokenStubs.TOKEN_INFO_ERC_20,
      initialData: apiData || undefined,
      select: (data) => {
        const dataWithAddress = data as typeof data & { address?: string };
        return {
          ...data,
          address_hash: data.address_hash || dataWithAddress.address || '',
          icon_url: data.icon_url || getTokenIconUrl(data.symbol),
        };
      },
    },
  });
}

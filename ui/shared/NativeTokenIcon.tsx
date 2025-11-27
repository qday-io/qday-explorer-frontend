import { chakra } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { HOMEPAGE_STATS } from 'stubs/stats';
import { Image } from 'toolkit/chakra/image';
import { Skeleton } from 'toolkit/chakra/skeleton';

import TokenLogoPlaceholder from './TokenLogoPlaceholder';

// Native token icon fallback
const NATIVE_TOKEN_ICON = '/static/token-icons/QDAY-128x128.svg';

type Props = {
  isLoading?: boolean;
  className?: string;
  type?: 'primary' | 'secondary';
};

const NativeTokenIcon = ({ isLoading, className, type }: Props) => {
  const statsQueryResult = useApiQuery('general:stats', {
    queryOptions: {
      refetchOnMount: false,
      placeholderData: HOMEPAGE_STATS,
    },
  });

  if (isLoading || statsQueryResult.isPlaceholderData) {
    return <Skeleton borderRadius="base" loading className={ className }/>;
  }

  const src = type === 'secondary' ?
    (statsQueryResult.data?.secondary_coin_image || NATIVE_TOKEN_ICON) :
    (statsQueryResult.data?.coin_image || NATIVE_TOKEN_ICON);

  return (
    <Image
      className={ className }
      borderRadius="base"
      src={ src }
      alt={ `${ config.chain.currency.symbol } logo` }
      fallback={ <TokenLogoPlaceholder/> }
    />
  );
};

export default chakra(NativeTokenIcon);

import type { GridProps, HTMLChakraProps } from '@chakra-ui/react';
import { Box, Grid, Flex, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import type { CustomLinksGroup } from 'types/footerLinks';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import useFetch from 'lib/hooks/useFetch';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { copy } from 'toolkit/utils/htmlEntities';
import { CONTENT_MAX_WIDTH } from 'ui/shared/layout/utils';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

import FooterLinkItem from './FooterLinkItem';
import IntTxsIndexingStatus from './IntTxsIndexingStatus';

const MAX_LINKS_COLUMNS = 4;

const Footer = () => {

  const QDAY_LINKS = [
    {
      iconUrl: [ '/static/logos/linktree.svg' ],
      text: 'Linktree',
      url: 'https://linktr.ee/officialpqabelian',
    },
    {
      iconUrl: [ '/static/logos/abelian.svg' ],
      text: 'Abelian',
      url: 'https://pqabelian.io/',
    },
  ];

  const fetch = useFetch();

  const { isPlaceholderData, data: linksData } = useQuery<unknown, ResourceError<unknown>, Array<CustomLinksGroup>>({
    queryKey: [ 'footer-links' ],
    queryFn: async() => fetch(config.UI.footer.links || '', undefined, { resource: 'footer-links' }),
    enabled: Boolean(config.UI.footer.links),
    staleTime: Infinity,
    placeholderData: [],
  });

  const colNum = isPlaceholderData ? 1 : Math.min(linksData?.length || Infinity, MAX_LINKS_COLUMNS) + 1;

  const renderNetworkInfo = React.useCallback((gridArea?: GridProps['gridArea']) => {
    return (
      <Flex
        alignItems="center"
        gridArea={ gridArea }
        flexWrap="wrap"
        justifyContent="flex-start"
        columnGap={ 3 }
        rowGap={ 2 }
        mb={{ base: 5, lg: 10 }}
        _empty={{ display: 'none' }}
      >
        { !config.UI.indexingAlert.intTxs.isHidden && <IntTxsIndexingStatus/> }
        <NetworkAddToWallet source="Footer"/>
      </Flex>
    );
  }, []);

  const renderProjectInfo = React.useCallback((gridArea?: GridProps['gridArea']) => {
    return (
      <Box gridArea={ gridArea }>
        <Box mb={ 3 }>
          <img
            src="/static/logos/qday-logo-h-blue.svg"
            alt="QDay Logo"
            style={{ height: '40px' }}
          />
        </Box>
        <Text mt={ 3 } fontSize="xs" maxW="400px">
          QDay is a post-quantum privacy-preserving Blockchain network, which adopts the NIST
          standardized lattice-based cryptography, and is cryptographically proven secure.
          Its cryptocurrency QDAY is also anonymous and untraceable.
        </Text>
        <Box mt={ 6 } alignItems="start" textStyle="xs">
          <Text>
            Copyright { copy } QDay { (new Date()).getFullYear() }
          </Text>
        </Box>
      </Box>
    );
  }, []);

  const containerProps: HTMLChakraProps<'div'> = {
    as: 'footer',
    borderTopWidth: '1px',
    borderTopColor: 'border.divider',
  };

  const contentProps: GridProps = {
    px: { base: 4, lg: config.UI.navigation.layout === 'horizontal' ? 6 : 12, '2xl': 6 },
    py: { base: 4, lg: 8 },
    gridTemplateColumns: { base: '1fr', lg: 'minmax(auto, 470px) 1fr' },
    columnGap: { lg: '32px', xl: '100px' },
    maxW: `${ CONTENT_MAX_WIDTH }px`,
    m: '0 auto',
  };

  const renderRecaptcha = (gridArea?: GridProps['gridArea']) => {
    if (!config.services.reCaptchaV2.siteKey) {
      return <Box gridArea={ gridArea }/>;
    }

    return (
      <Box gridArea={ gridArea } textStyle="xs" mt={ 6 }>
        <span>This site is protected by reCAPTCHA and the Google </span>
        <Link href="https://policies.google.com/privacy" external noIcon>Privacy Policy</Link>
        <span> and </span>
        <Link href="https://policies.google.com/terms" external noIcon>Terms of Service</Link>
        <span> apply.</span>
      </Box>
    );
  };

  if (config.UI.footer.links) {
    return (
      <Box { ...containerProps }>
        <Grid { ...contentProps }>
          <div>
            { renderNetworkInfo() }
            { renderProjectInfo() }
            { renderRecaptcha() }
          </div>

          <Grid
            gap={{ base: 6, lg: colNum === MAX_LINKS_COLUMNS + 1 ? 2 : 8, xl: 12 }}
            gridTemplateColumns={{
              base: 'repeat(auto-fill, 160px)',
              lg: `repeat(${ colNum }, 135px)`,
              xl: `repeat(${ colNum }, 160px)`,
            }}
            justifyContent={{ lg: 'flex-end' }}
            mt={{ base: 8, lg: 0 }}
          >
            {
              ([
                { title: 'QDay', links: QDAY_LINKS },
                ...(linksData || []),
              ])
                .slice(0, colNum)
                .map(linkGroup => (
                  <Box key={ linkGroup.title }>
                    <Skeleton fontWeight={ 500 } mb={ 3 } display="inline-block" loading={ isPlaceholderData }>{ linkGroup.title }</Skeleton>
                    <VStack gap={ 1 } alignItems="start">
                      { linkGroup.links.map(link => <FooterLinkItem { ...link } key={ link.text } isLoading={ isPlaceholderData }/>) }
                    </VStack>
                  </Box>
                ))
            }
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box { ...containerProps }>
      <Grid
        { ...contentProps }
        gridTemplateAreas={{
          lg: `
          "network links-top"
          "info links-bottom"
          "recaptcha links-bottom"
        `,
        }}
      >

        { renderNetworkInfo({ lg: 'network' }) }
        { renderProjectInfo({ lg: 'info' }) }
        { renderRecaptcha({ lg: 'recaptcha' }) }

        <Flex
          gridArea={{ lg: 'links-bottom' }}
          justifyContent={{ base: 'flex-start', lg: 'flex-end' }}
          alignItems="flex-start"
          gap={ 4 }
          mt={{ base: 8, lg: 0 }}
        >
          { QDAY_LINKS.map(link => (
            <Link key={ link.text } href={ link.url } external display="flex" alignItems="center" gap={ 2 }>
              <img src={ link.iconUrl[0] } alt={ link.text } style={{ width: '27px', height: '27px' }}/>
              <Text fontSize="sm">{ link.text }</Text>
            </Link>
          )) }
        </Flex>
      </Grid>
    </Box>
  );
};

export default React.memo(Footer);

import type { AlertProps } from "@chakra-ui/react";
import { Alert, Skeleton, chakra } from "@chakra-ui/react";
import React from "react";

import config from "configs/app";

interface Props {
  isLoading?: boolean;
  className?: string;
  contentProps?: AlertProps;
}

const TestnetWarning = ({ isLoading, className, contentProps }: Props) => {
  if (!config.chain.isTestnet) {
    return null;
  }

  return (
    <Skeleton className={className} isLoaded={!isLoading}>
      <Alert status="warning" {...contentProps}>
        This is a testnet transaction only
      </Alert>
    </Skeleton>
  );
};

export default React.memo(chakra(TestnetWarning));

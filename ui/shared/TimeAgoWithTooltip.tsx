import type { TextProps } from "@chakra-ui/react";
import { Skeleton, Text, Tooltip, chakra } from "@chakra-ui/react";
import React from "react";

import dayjs from "lib/date/dayjs";
import useTimeAgoIncrement from "lib/hooks/useTimeAgoIncrement";

type Props = {
  timestamp?: string | null;
  fallbackText?: string;
  isLoading?: boolean;
  enableIncrement?: boolean;
  className?: string;
  contentProps?: TextProps;
};

const TimeAgoWithTooltip = ({
  timestamp,
  fallbackText,
  isLoading,
  enableIncrement,
  className,
  contentProps,
}: Props) => {
  const timeAgo = useTimeAgoIncrement(timestamp || "", enableIncrement && !isLoading);
  if (!timestamp && !fallbackText) {
    return null;
  }

  const content = timestamp ? (
    <Tooltip label={dayjs(timestamp).format("llll")}>
      <Text {...contentProps}>{timeAgo}</Text>
    </Tooltip>
  ) : (
    <Text {...contentProps}>{fallbackText}</Text>
  );

  return (
    <Skeleton isLoaded={!isLoading} className={className}>
      {content}
    </Skeleton>
  );
};

export default chakra(TimeAgoWithTooltip);

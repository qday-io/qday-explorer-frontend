import { Grid } from "@chakra-ui/react";
import { color } from "enums/colors";
import React from "react";

import useApiQuery from "lib/api/useApiQuery";
import { STATS_COUNTER } from "stubs/stats";
import StatsWidget from "ui/shared/stats/StatsWidget";

import DataFetchAlert from "../shared/DataFetchAlert";

const UNITS_WITHOUT_SPACE = ["s"];

const NumberWidgetsList = () => {
  const { data, isPlaceholderData, isError } = useApiQuery("stats_counters", {
    queryOptions: {
      placeholderData: { counters: Array(10).fill(STATS_COUNTER) },
    },
  });

  if (isError) {
    return <DataFetchAlert />;
  }

  return (
    <Grid gridTemplateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gridGap={4}>
      {data?.counters?.map(({ id, title, value, units, description }, index) => {
        let unitsStr = "";
        if (units && UNITS_WITHOUT_SPACE.includes(units)) {
          unitsStr = units;
        } else if (units) {
          unitsStr = " " + units;
        }

        return (
          <StatsWidget
            key={id + (isPlaceholderData ? index : "")}
            label={title}
            value={`${Number(value).toLocaleString(undefined, { maximumFractionDigits: 3, notation: "compact" })}${unitsStr}`}
            isLoading={isPlaceholderData}
            hint={description}
            containerProps={{
              backgroundColor: color.fillOpacityBrand10,
              p: 0,
            }}
            labelProps={{
              fontSize: { base: 12, md: 14 },
              fontWeight: 400,
              color: color.textSecondary,
              marginBottom: { base: 0, md: 2 },
            }}
            valueProps={{
              fontSize: { base: 14, md: 20 },
              fontWeight: 600,
              color: color.textPrimary,
            }}
            hintProps={{
              alignSelf: "flex-start",
              mt: 1,
              mr: { base: 1, md: 1 },
            }}
            boxContainerProps={{
              paddingY: { base: 2, md: 3 },
              ml: { base: 2, md: 3 },
              display: { base: "block", md: "flex" },
              flexDir: "column",
              gap: 3,
            }}
          />
        );
      })}
    </Grid>
  );
};

export default NumberWidgetsList;

import { color } from "enums/colors";
import React from "react";

import type { TimeChartData } from "ui/shared/chart/types";

import useIsMobile from "lib/hooks/useIsMobile";
import ChartArea from "ui/shared/chart/ChartArea";
import ChartAxis from "ui/shared/chart/ChartAxis";
import ChartGridLine from "ui/shared/chart/ChartGridLine";
import ChartLine from "ui/shared/chart/ChartLine";
import ChartOverlay from "ui/shared/chart/ChartOverlay";
import ChartTooltip from "ui/shared/chart/ChartTooltip";
import useTimeChartController from "ui/shared/chart/useTimeChartController";

interface Props {
  data: TimeChartData;
  caption?: string;
}

const CHART_MARGIN = { bottom: 5, left: 10, right: 10, top: 5 };

const ChainIndicatorChart = ({ data }: Props) => {
  const overlayRef = React.useRef<SVGRectElement>(null);
  const isMobile = useIsMobile();

  const axesConfig = React.useMemo(() => {
    return {
      x: { ticks: 4 },
      y: { ticks: 3, nice: true, noLabel: true },
    };
  }, []);

  const { rect, ref, axes, innerWidth, innerHeight } = useTimeChartController({
    data,
    margin: CHART_MARGIN,
    axesConfig,
  });

  return (
    <svg width="100%" height="100%" ref={ref} cursor="pointer" id="transaction" opacity={rect ? 1 : 0}>
      <g transform={`translate(${22},${-15})`}>
        <ChartGridLine
          type="horizontal"
          scale={axes.y.scale}
          ticks={axesConfig.y.ticks}
          size={innerWidth}
          noAnimation
        />

        <ChartArea id="transaction" data={data[0].items} xScale={axes.x.scale} yScale={axes.y.scale} />

        <ChartLine
          data={data[0].items}
          xScale={axes.x.scale}
          yScale={axes.y.scale}
          stroke={color.fillOpacityBrand}
          animation="none"
          strokeWidth={isMobile ? 1 : 2}
        />

        <ChartAxis
          type="left"
          scale={axes.y.scale}
          ticks={axesConfig.y.ticks}
          tickFormatGenerator={axes.y.tickFormatter}
          noAnimation
        />

        <ChartAxis
          type="bottom"
          scale={axes.x.scale}
          transform={`translate(0, ${innerHeight})`}
          ticks={axesConfig.x.ticks}
          anchorEl={overlayRef.current}
          tickFormatGenerator={axes.x.tickFormatter}
          noAnimation
        />

        <ChartOverlay ref={overlayRef} width={innerWidth} height={innerHeight}>
          <ChartTooltip
            anchorEl={overlayRef.current}
            width={innerWidth}
            tooltipWidth={200}
            height={innerHeight}
            xScale={axes.x.scale}
            yScale={axes.y.scale}
            data={data}
          />
        </ChartOverlay>
      </g>
    </svg>
  );
};

export default React.memo(ChainIndicatorChart);

import React from 'react';
import * as echarts from 'echarts/core';
import EChartsReact, { EChartsReactProps } from 'echarts-for-react';
import {
  // LineChart,
  // BarChart
  PieChart
  // ScatterChart,
  // RadarChart,
  // MapChart,
  // TreeChart,
  // TreemapChart,
  // GraphChart,
  // GaugeChart,
  // FunnelChart,
  // ParallelChart,
  // SankeyChart,
  // BoxplotChart,
  // CandlestickChart,
  // EffectScatterChart,
  // LinesChart,
  // HeatmapChart,
  // PictorialBarChart,
  // ThemeRiverChart,
  // SunburstChart,
  // CustomChart,
} from 'echarts/charts';

import {
  // GridSimpleComponent,
  GridComponent,
  // PolarComponent,
  // RadarComponent,
  // GeoComponent,
  // SingleAxisComponent,
  // ParallelComponent,
  // CalendarComponent,
  // GraphicComponent,
  // ToolboxComponent,
  TooltipComponent,
  // AxisPointerComponent,
  // BrushComponent,
  TitleComponent
  // TimelineComponent,
  // MarkPointComponent,
  // MarkLineComponent,
  // MarkAreaComponent,
  // LegendComponent,
  // LegendScrollComponent,
  // LegendPlainComponent,
  // DataZoomComponent,
  // DataZoomInsideComponent,
  // DataZoomSliderComponent,
  // VisualMapComponent,
  // VisualMapContinuousComponent,
  // VisualMapPiecewiseComponent,
  // AriaComponent,
  // TransformComponent,
  // DatasetComponent,
} from 'echarts/components';

import {
  CanvasRenderer
  // SVGRenderer,
} from 'echarts/renderers';

echarts.use([TitleComponent, TooltipComponent, GridComponent, PieChart, CanvasRenderer]);
echarts.registerTheme('timelet', {});

export default function EChartsIntegration(props: EChartsReactProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <EChartsReact echarts={echarts} style={{ height: '100%', width: '100%' }} theme="timelet" lazyUpdate {...props} />;
}

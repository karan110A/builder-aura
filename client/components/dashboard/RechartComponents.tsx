import React from "react";
import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from "recharts";
import type { XAxisProps, YAxisProps } from "recharts";

// Custom XAxis wrapper with explicit default props
export const XAxis: React.FC<XAxisProps> = ({
  axisLine = true,
  tickLine = true,
  tickMargin = 5,
  tick = true,
  allowDecimals = true,
  allowDuplicatedCategory = true,
  angle = 0,
  height = 30,
  interval = "preserveStartEnd",
  minTickGap = 5,
  orientation = "bottom",
  reversed = false,
  tickCount = 5,
  type = "category",
  width = 0,
  xAxisId,
  yAxisId,
  ...props
}) => (
  <RechartsXAxis
    axisLine={axisLine}
    tickLine={tickLine}
    tickMargin={tickMargin}
    tick={tick}
    allowDecimals={allowDecimals}
    allowDuplicatedCategory={allowDuplicatedCategory}
    angle={angle}
    height={height}
    interval={interval}
    minTickGap={minTickGap}
    orientation={orientation}
    reversed={reversed}
    tickCount={tickCount}
    type={type}
    width={width}
    xAxisId={xAxisId}
    {...props}
  />
);

// Custom YAxis wrapper with explicit default props  
export const YAxis: React.FC<YAxisProps> = ({
  axisLine = true,
  tickLine = true,
  tickMargin = 5,
  tick = true,
  allowDecimals = true,
  allowDuplicatedCategory = false,
  orientation = "left",
  type = "number",
  width = 60,
  height = 0,
  ...props
}) => (
  <RechartsYAxis
    axisLine={axisLine}
    tickLine={tickLine}
    tickMargin={tickMargin}
    tick={tick}
    allowDecimals={allowDecimals}
    allowDuplicatedCategory={allowDuplicatedCategory}
    orientation={orientation}
    type={type}
    width={width}
    height={height}
    {...props}
  />
);

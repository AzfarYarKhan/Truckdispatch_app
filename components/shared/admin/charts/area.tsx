"use client";

import { AreaChart } from "@tremor/react";

interface AreaChartProps {
  areaChartData: { date: string; Completed: number; Missed: number }[];
}

const dataFormatter = (number: number): string => {
  return number.toString();
};

export function AreaChartHero({ areaChartData }: AreaChartProps) {
  return (
    <AreaChart
      className="h-80"
      data={areaChartData}
      index="date"
      categories={["Completed", "Missed"]}
      colors={["indigo", "rose"]}
      valueFormatter={dataFormatter}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}

"use client";

import { BarChart } from "@tremor/react";

const dataFormatter = (number: number): string => {
  return number.toString();
};

export const BarChartHero = ({ chartData }: { chartData: any[] }) => (
  <BarChart
    data={chartData}
    index="date"
    categories={["Number of Jobs Due"]}
    colors={["blue"]}
    valueFormatter={dataFormatter}
    yAxisWidth={48}
    onValueChange={(v) => console.log(v)}
  />
);

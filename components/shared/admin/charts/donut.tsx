"use client";

import { DonutChart, Legend } from "@tremor/react";

interface DonutChartProps {
  jobs: { name: string; jobs: number }[];
}
const valueFormatter = (number: number): string => {
  return `Total jobs ${number.toString()}`;
};

export function DonutChartHero({ jobs }: DonutChartProps) {
  return (
    <div className="mt-12">
      <div className="flex-col items-center justify-center space-y-6 lg:space-y-20">
        <DonutChart
          data={jobs}
          category="jobs"
          index="name"
          valueFormatter={valueFormatter}
          colors={["blue", "cyan", "indigo", "fuchsia"]}
          className="w-120"
        />
        <Legend
          categories={["Completed", "Missed", "Pending", "Active"]}
          colors={["blue", "cyan", "indigo", "fuchsia"]}
          className="w-120 pl-12"
        />
      </div>
    </div>
  );
}

import prisma from "@/app/libs/prismadb";
import Card from "@/components/shared/driver/card";
import { DonutChartHero } from "@/components/shared/admin/charts/donut";
import { BarChartHero } from "@/components/shared/admin/charts/bar";
import { AreaChartHero } from "@/components/shared/admin/charts/area";

export default async function Dashboard() {
  const getJobCounts = (jobs: any[]) => {
    const completedJobs = jobs.filter(
      (job) => job.status === "COMPLETED"
    ).length;
    const pendingJobs = jobs.filter((job) => job.status === "PENDING").length;
    const missedJobs = jobs.filter((job) => job.status === "MISSED").length;
    const activeJobs = jobs.filter((job) => job.status === "ACTIVE").length;

    return { completedJobs, missedJobs, pendingJobs, activeJobs };
  };
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7); // Filter for last weeks jobs based on due date

  const jobs = await prisma.job.findMany({
    where: {
      date: {
        gte: sevenDaysAgo.toISOString(),
      },
    },
  });
  const { completedJobs, missedJobs, pendingJobs, activeJobs } = getJobCounts(
    jobs || []
  );
  const donutjobs = [
    {
      name: "Completed Jobs",
      jobs: completedJobs,
    },
    {
      name: "Missed Jobs",
      jobs: missedJobs,
    },
    {
      name: "Pending Jobs",
      jobs: pendingJobs,
    },
    {
      name: "Active Jobs",
      jobs: activeJobs,
    },
  ];
  const transformedBarChartData: Record<string, number> = jobs.reduce(
    (acc, job) => {
      const dateKey = job.date.toISOString().split("T")[0];
      acc[dateKey] = acc[dateKey] || 0;
      acc[dateKey]++;
      return acc;
    },
    {} as Record<string, number>
  );
  const last7Days = Array.from({ length: 7 }, (_, index) => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - index);
    return currentDate.toISOString().split("T")[0];
  });

  const barChartData = last7Days.map((date) => ({
    date: new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    "Number of Jobs Due": transformedBarChartData[date] || 0,
  }));
  const areaChartData = await prisma.job
    .findMany({
      where: {
        date: {
          gte: sevenDaysAgo.toISOString(),
        },
      },
    })
    .then((jobs) =>
      jobs.reduce((acc, job) => {
        const dateKey = job.date.toISOString().split("T")[0];
        acc[dateKey] = acc[dateKey] || { Completed: 0, Missed: 0 };
        if (job.status === "COMPLETED") {
          acc[dateKey].Completed++;
        } else if (job.status === "MISSED") {
          acc[dateKey].Missed++;
        }
        return acc;
      }, {} as Record<string, { Completed: number; Missed: number }>)
    );

  const areaChartArray = Object.keys(areaChartData).map((date) => ({
    date: new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    ...areaChartData[date],
  }));
  return (
    <div className="flex-col mt-20 lg:pl-16 px-2 pb-24 ">
      <div className="flex gap-1 md:gap-24 justify-between xl:justify-start mr-1">
        <Card title="Completed Jobs" value={completedJobs.toString()} />
        <Card title="Missed Jobs" value={missedJobs.toString()} />
        <Card title="Pending Jobs" value={pendingJobs.toString()} />
      </div>
      <div className="grid sm:max-xl:grid-cols-1 xl:grid-cols-2 gap-4 mt-6 justify-center max-w-[1100px]">
        <div className="col-span-1 xl:col-span-2 m-2">
          <AreaChartHero areaChartData={areaChartArray} />
        </div>
        <div className="col-span-1 xl:col-span-1 m-2 ">
          <DonutChartHero jobs={donutjobs} />
        </div>
        <div className="col-span-1 xl:col-span-1 m-2 ">
          <BarChartHero chartData={barChartData} />
        </div>
      </div>
    </div>
  );
}

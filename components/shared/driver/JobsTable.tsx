"use client";

import { useEffect, useState } from "react";
import { Jobdata, columns } from "@/app/driver/jobs/columns";
import { DataTable } from "@/app/driver/jobs/data-table";
import { getdriverJobsData } from "@/app/actions/job.actions";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function JobsTable({ driverId }: { driverId: string }) {
  const [data, setData] = useState<Jobdata[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const jobsData = await getdriverJobsData(driverId);
      setData(jobsData);
    };

    fetchData();
  }, [driverId]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col pt-20 px-1 ">
        <div className="container mx-auto py-5 md:px-10 lg:px-32 mt-2">
          <div className="flex flex-col gap-4 mx-auto pb-2 max-w-3xl">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

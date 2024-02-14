"use client";

import { useEffect, useState } from "react";
import { Jobdata, columns } from "@/app/admin/jobs/columns";
import { DataTable } from "@/app/admin/jobs/data-table";
import { getAllJobsData } from "@/app/actions/job.actions";
import JobModal from "@/components/shared/admin/job/JobModal";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Jobs() {
  const [data, setData] = useState<Jobdata[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const jobsData = await getAllJobsData();
      setData(jobsData);
    };

    fetchData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col  pt-20 px-1 ">
        <div className="flex justify-end max-w-3xl md:max-w-5xl ">
          <JobModal />
        </div>
        <div className="container mx-auto py-5 md:px-10 lg:px-32 mt-2">
          <div className="flex flex-col gap-4 mx-auto pb-2 max-w-3xl ">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

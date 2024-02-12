"use client";

import TableDemo from "@/components/shared/driver/ordertable";
import JobModal from "@/components/shared/admin/job/JobModal";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default async function Jobs() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col  pt-28 px-1 ">
        <div className="flex justify-end max-w-3xl md:max-w-5xl ">
          <JobModal />
        </div>
        <div className="flex flex-col gap-4 mx-auto mt-12 pb-24">
          {/* <TableDemo /> */}
        </div>
      </div>
    </QueryClientProvider>
  );
}

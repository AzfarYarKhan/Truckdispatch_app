import prisma from "@/app/libs/prismadb";
import JobCard from "@/components/shared/admin/job/Jobcard";
import Button from "@/components/buttons/jobcancellbutton";

export default async function jobdetails({
  params,
}: {
  params: { name: string };
}) {
  const jobname = decodeURIComponent(params.name);
  const job = await prisma.job.findUnique({
    where: {
      job_name: jobname,
    },
    include: {
      driver: {
        include: {
          user: true,
        },
      },
    },
  });
  const job_date = job?.date.toISOString();

  return (
    <div className="flex-col mt-20 xl:mt-12 lg:px-20 px-2 pt-4 sm:max-xl:pb-28 xl:pb-12 xl:mr-2 ">
      <div className="flex bg-black h-60 xl:h-80"></div>
      {job ? (
        <div className="xl:grid sm:max-xl:grid-cols-1 xl:grid-cols-2 gap-8 xl:mt-2 ">
          <div className="col-span-1 xl:col-span-1 xl:p-2">
            <div className="xl:w-[400px] w-full  px-1 ">
              <JobCard
                pickup_loc={job.pickup_name || ""}
                dropoff_loc={job.dropoff_name || ""}
                date={job_date || ""}
                distance={job.distance || ""}
                driver={job?.driver?.user.name || ""}
                driver_email={job?.driver?.user.email || ""}
                status={job.status}
              />
            </div>
          </div>
          <div className="col-span-1 xl:col-span-1 xl:pt-6">
            {job?.status === "PENDING" && <Button jobname={job.job_name} />}
          </div>
        </div>
      ) : (
        <div className="text-center text-neutral-800 mt-4">
          Sorry, no job found.
        </div>
      )}
    </div>
  );
}

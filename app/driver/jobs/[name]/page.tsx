import prisma from "@/app/libs/prismadb";
import JobCard from "@/components/shared/driver/Jobcard";
import Button from "@/components/buttons/jobacceptbutton";
import JobMap from "@/components/shared/driver/jobmap";

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
    <div className="flex-col mt-6 lg:mt-12 lg:px-20 px-2 pt-4 pb-16 lg:pb-12 xl:mr-2 ">
      {job ? (
        <>
          <JobMap
            pickupame={job.pickup_name || ""}
            dropoffname={job.dropoff_name || ""}
            pickupLocation={job.pickup_loc}
            dropoffLocation={job.dropoff_loc}
          />
          <div className="xl:grid sm:max-xl:grid-cols-1 xl:grid-cols-2 gap-8 xl:mt-2 ">
            <div className="col-span-1 xl:col-span-1 xl:p-2">
              <div className="xl:w-[400px] w-full   ">
                <JobCard
                  pickup_loc={job.pickup_name || ""}
                  dropoff_loc={job.dropoff_name || ""}
                  date={job_date || ""}
                  distance={job.distance || ""}
                  status={job.status}
                />
              </div>
            </div>
            <div className="col-span-1 xl:col-span-1 xl:pt-6">
              {(job?.status === "PENDING" || job?.status === "ACTIVE") && (
                <Button
                  jobname={job.job_name}
                  jobstatus={job.status}
                  pickupLocation={job.pickup_loc}
                  dropoffLocation={job.dropoff_loc}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center text-neutral-800 mt-4">
          Sorry, no job found.
        </div>
      )}
    </div>
  );
}

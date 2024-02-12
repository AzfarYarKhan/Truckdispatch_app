import prisma from "@/app/libs/prismadb";
import Card from "@/components/shared/driver/card";
import ProfileCard from "@/components/shared/driver/profilecard";
import OrdersTable from "@/components/shared/driver/ordertable";

export default async function driverdetails({
  params,
}: {
  params: { email: string };
}) {
  const req_email = decodeURIComponent(params.email);
  const user = await prisma.user.findUnique({
    where: {
      email: req_email,
    },
    include: {
      driver: {
        include: {
          jobs: true,
        },
      },
    },
  });
  const getJobCounts = (jobs: any[]) => {
    const completedJobs = jobs.filter(
      (job) => job.status === "COMPLETED"
    ).length;
    const ongoingJobs = jobs.filter((job) => job.status === "ACTIVE").length;
    const pendingJobs = jobs.filter((job) => job.status === "PENDING").length;

    return { completedJobs, ongoingJobs, pendingJobs };
  };
  const jobs = user?.driver?.jobs;
  const { completedJobs, ongoingJobs, pendingJobs } = getJobCounts(jobs || []);
  const jobsdata = jobs?.map((job) => ({
    Name: job.job_name,
    Status: job.status,
    Distance: job.distance,
    Date: job.date.toISOString(),
  }));
  return (
    <div className="flex-col mt-24 lg:pl-12 pl-2 pb-24 mr-2">
      <div className="flex gap-1 md:gap-24 p-1 justify-between xl:justify-start ">
        <Card title="Completed Jobs" value={completedJobs.toString()} />
        <Card title="Ongoing Jobs" value={ongoingJobs.toString()} />
        <Card title="Pending Jobs" value={pendingJobs.toString()} />
      </div>
      <div className="grid sm:max-xl:grid-cols-1 xl:grid-cols-4 gap-4 mt-6 justify-center ">
        <div className="col-span-1 xl:col-span-1 p-2">
          <ProfileCard
            name={user?.name || ""}
            email={user?.email || ""}
            image={user?.image || ""}
            address={user?.driver?.address || ""}
            phone={user?.driver?.phone_number || ""}
            company={user?.driver?.company || ""}
          />
        </div>
        <div className="col-span-1 xl:col-span-3 m-2 md:pl-10">
          {jobs ? (
            <OrdersTable Jobs={jobsdata || []} />
          ) : (
            <div className="col-span-1 xl:col-span-3 m-2 md:pl-10 flex items-center justify-center pt-6">
              <div className="text-lg"> No jobs yet</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

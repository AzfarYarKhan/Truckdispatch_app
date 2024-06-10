import { getAllJobsData } from "@/app/actions/job.actions";
import AdminJobs from "@/components/shared/admin/job/adminjobs";
export default async function Jobs() {
  const jobsData = await getAllJobsData();
  return (
    <div>
      <AdminJobs jobsData={jobsData} />
    </div>
  );
}

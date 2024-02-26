import getCurrentUser from "@/app/actions/getCurrentUser";
import { PrismaClient, User } from "@prisma/client";
import JobsTable from "@/components/shared/driver/JobsTable";
const prisma = new PrismaClient();

export default async function Jobs() {
  const currentUser = await getCurrentUser();
  const currentDriver = await prisma.driver.findFirst({
    where: {
      userId: currentUser?.id,
    },
  });
  return (
    <div>
      {currentDriver ? (
        <JobsTable driverId={currentDriver.id} />
      ) : (
        <p>No driver found for the current user.</p>
      )}
    </div>
  );
}

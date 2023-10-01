import getCurrentUser from "@/app/actions/getCurrentUser";
import Sidebar from "@/components/shared/driver/sidebar";
import Bottombar from "@/components/shared/driver/bottombar";
import Topbar from "@/components/shared/driver/topbar";
import ModalProvider from "@/components/shared/driver/modalprovider";
import { PrismaClient, User, Driver } from "@prisma/client";
const prisma = new PrismaClient();

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let is_modalopen: boolean = false;
  const currentUser = await getCurrentUser();
  const currentDriver = await prisma.driver.findFirst({
    where: {
      userId: currentUser?.id,
    },
  });
  if (
    currentUser?.image === null ||
    currentDriver === null ||
    currentDriver.address === null ||
    currentDriver.company === null ||
    currentDriver.phone_number === null
  ) {
    is_modalopen = true;
  }
  return (
    <>
      <ModalProvider is_modalopen={is_modalopen} />
      <section className="flex">
        <Topbar />
        <Sidebar currentUser={currentUser} />
        <div className="w-full">{children}</div>
        <Bottombar />
      </section>
    </>
  );
}

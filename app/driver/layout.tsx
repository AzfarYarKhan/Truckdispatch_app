import getCurrentUser from "@/app/actions/getCurrentUser";
import Sidebar from "@/components/shared/driver/sidebar";
import Bottombar from "@/components/shared/driver/bottombar";
import Topbar from "@/components/shared/driver/topbar";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <section className="flex">
      <Topbar />
      <Sidebar currentUser={currentUser} />
      <div className="w-full">{children}</div>
      <Bottombar />
    </section>
  );
}

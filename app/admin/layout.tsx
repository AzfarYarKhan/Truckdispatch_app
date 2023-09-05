import Adminsidebar from "@/components/shared/admin/adminsidebar";
import Bottombar from "@/components/shared/admin/bottombar";
import Topbar from "@/components/shared/admin/topbar";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex">
      <Topbar />
      <Adminsidebar />
      <div className="w-full">{children}</div>
      <Bottombar />
    </section>
  );
}

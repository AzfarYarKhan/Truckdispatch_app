import Adminsidebar from "@/components/shared/adminsidebar";
import Bottombar from "@/components/shared/bottombar";
import Topbar from "@/components/shared/topbar";
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

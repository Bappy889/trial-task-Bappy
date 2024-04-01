import Sidebar from "@/components/Sidebar";
import { Tabs } from "@/components/Tabs";
export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex items-start justify-between">
      {/* Include shared UI here e.g. a header or sidebar */}
      <Sidebar />
      <div className="flex-1 px-4 ml-[300px] overflow-y-auto">{children}</div>
    </section>
  );
}

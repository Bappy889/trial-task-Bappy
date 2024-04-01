import DashboardData from "@/components/DashboardData";
export default function Dashboard() {
  const propsToPass = {
    name: "pancake", // Replace "value" with the actual value you want to pass
  };
  return <DashboardData {...propsToPass} />;
}

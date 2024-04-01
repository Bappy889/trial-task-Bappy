import DashboardData from "@/components/DashboardData";
export default function Dashboard() {
  const propsToPass = {
    name: "uniswap", // Replace "value" with the actual value you want to pass
  };
  return <DashboardData {...propsToPass} />;
}

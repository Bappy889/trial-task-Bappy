import React from "react";
import { TableList } from "./TableList";

// Define the type for the props accepted by DashboardData
interface DashboardDataProps {
  name: string; // Example type, should match the type defined in DashboardProps
}

export default function DashboardData() {
  return (
    <div>
      <TableList />
    </div>
  );
}

import React from "react";
import { Tabs } from "./Tabs";
import { Filter } from "./Filter";
import { TableList } from "./TableList";
import { Paginations } from "./Paginations";

// Define the type for the props accepted by DashboardData
interface DashboardDataProps {
  name: string; // Example type, should match the type defined in DashboardProps
}

export default function DashboardData(props: DashboardDataProps) {
  const { name } = props;
  console.log("DashboardData");
  console.log(name);
  return (
    <div>
      {/* <Tabs /> */}

      <TableList name={name} />
      <Paginations />
    </div>
  );
}

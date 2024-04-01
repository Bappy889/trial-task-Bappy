"use client";

import React, { useEffect } from "react";
import { TableList } from "./TableList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define the type for the props accepted by DashboardData
interface DashboardDataProps {
  name: string; // Example type, should match the type defined in DashboardProps
}

export default function DashboardData() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !session) {
      router.push("/login"); // Redirect to login page if user is not authenticated
    }
  }, [session, status, router]);

  return (
    <div>
      <TableList />
    </div>
  );
}

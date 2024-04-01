"use client";
import WalletConnect from "@/components/WalletConnect";
import React from "react";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Wallet() {
  const { data: session, update } = useSession();

  if (session && session?.walletAddress) redirect("/dashboard");
  return (
    <div>
      <Button onClick={() => console.log({ session })}>log session</Button>
      <WalletConnect />
    </div>
  );
}

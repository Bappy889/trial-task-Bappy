"use client";
// import WalletConnect from "@/components/WalletConnect";
// import React from "react";

// import { useSession } from "next-auth/react";
// import { Button } from "@/components/ui/button";
// import { redirect } from "next/navigation";

// export default function Wallet() {
//   const { data: session, update } = useSession();

//   if (session && session?.walletAddress) redirect("/dashboard");
//   return (
//     <div>
//       <Button onClick={() => console.log({ session })}>log session</Button>
//       <WalletConnect />
//     </div>
//   );
// }

// Wallet.tsx
import WalletConnect from "@/components/WalletConnect";
import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Wallet() {
  const { data: session, update } = useSession();

  if (session && session?.walletAddress) redirect("/dashboard");

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-lg font-semibold mb-4 text-center">
          Please connect your metamask wallet
        </h1>
        {/* <Button onClick={() => console.log({ session })}>Log Session</Button> */}
        <WalletConnect />
      </div>
    </div>
  );
}

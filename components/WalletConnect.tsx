"use client";
declare var window: any;

import { ethers } from "ethers";
import React from "react";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WalletConnect() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Wallet not found in the browser");
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const balance = await provider.getBalance(signer.address);
      const res = await update({
        ...session,
        user: {
          ...session?.user,
          walletAddress: signer.address,
        },
      });
    } catch (error: any) {
      alert(error.message);
    }
  };
  return (
    <div>
      <Button
        className="relative w-full flex items-center justify-center p-5 gap-4 bg-purple-600 text-white"
        variant="outline"
        size="icon"
        onClick={connectWallet}
      >
        <Wallet />
        Connect
      </Button>
    </div>
  );
}

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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        className="relative w-full flex items-center justify-start p-5 gap-4 bg-red-500 text-white"
        variant="outline"
        size="icon"
        onClick={connectWallet}
      >
        <Wallet />
        Connect Wallet
      </Button>
    </div>
  );
}

"use client";
declare var window: any;
import Image from "next/image";
import { Button } from "./ui/button";
import TruncatedText from "./TruncatedText";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import {
  Ellipsis,
  LayoutDashboard,
  LogOut,
  Settings,
  UserRoundCheck,
  Wallet,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      console.log("logging out");
      await signOut({ redirect: false, callbackUrl: "/" });
      console.log("Logout successful");
      router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="w-[300px] min-h-screen border-r fixed flex py-5 px-5 top-0 left-0 overflow-y-auto">
      <div className=" flex flex-col w-full">
        {/* image with wallet */}
        <div className="flex flex-col items-center gap-5 pb-5 h-1/6">
          <div>
            {/* <Image
              src="https://i.pravatar.cc/300"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            /> */}
            <UserRoundCheck />
          </div>

          <Button
            className="relative w-full flex items-center justify-start p-5 gap-4"
            variant="outline"
            size="icon"
          >
            <Wallet />
            {session ? (
              <div>
                {/* <span>{balance}</span> */}
                <TruncatedText text={session.walletAddress} maxLength={12} />
              </div>
            ) : (
              "Connect"
            )}
          </Button>
        </div>

        <hr className="border-red-200"></hr>

        <div className="flex flex-col justify-start gap-5 h-2/3 py-10 ">
          <Button
            className="relative w-full flex items-center justify-start p-5 gap-4 bg-red-500 text-white"
            variant="outline"
            size="icon"
          >
            <LayoutDashboard />
            Dex Dashboard
          </Button>
          <Button
            className="relative w-full flex items-center justify-start p-5 gap-4 text-black"
            variant="ghost"
            size="icon"
          >
            <Settings />
            Settings
          </Button>
          <Button
            className="relative w-full flex items-center justify-start p-5 gap-4 text-black"
            variant="ghost"
            size="icon"
          >
            <Ellipsis />
            More
          </Button>
        </div>
        <hr className="border-red-200"></hr>

        <div className="h-1/6 flex items-center justify-center">
          <Button
            className="relative w-full flex items-center justify-start p-5 gap-4 text-red-500"
            variant="ghost"
            size="icon"
            onClick={handleLogout}
          >
            <LogOut />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}

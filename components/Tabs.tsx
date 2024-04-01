"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useRef } from "react";

export function Tabs() {
  const elementsRef = useRef<HTMLButtonElement[]>([]);
  const router = useRouter(); // Initialize useRouter hook
  const tabClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    route: string // Accept route as a parameter
  ): void => {
    e.preventDefault();
    let elements = document.getElementsByClassName("text-red-500");
    const elementsArray = Array.from(elements) as HTMLButtonElement[];
    elementsRef.current = elementsArray;
    elementsRef.current.forEach((element) => {
      element.classList.remove("text-red-500");
    });
    // e.target.classList.add("tab_active");
    (e.target as HTMLButtonElement).classList.add("text-red-500");
    router.push(`/dashboard/${route}`);
  };
  return (
    <div className="w-auto pt-5 border-b">
      <div className="w-auto">
        <div className="">
          <button
            className="tablinks p-5 text-lg text-red-500"
            id="created"
            onClick={(e) => {
              tabClick(e, "");
            }}
          >
            All
          </button>
          <button
            className="tablinks p-5"
            id="owned"
            onClick={(e) => {
              tabClick(e, "uniswap");
            }}
          >
            uniswap
          </button>
          <button
            className="tablinks p-5"
            id="collection"
            onClick={(e) => {
              tabClick(e, "pancake");
            }}
          >
            pancake
          </button>
        </div>
      </div>
    </div>
  );
}

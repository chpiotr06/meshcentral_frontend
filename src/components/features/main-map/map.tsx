"use client";

import dynamic from "next/dynamic";

const AllDevices = dynamic(() => import("./all-devices"), { ssr: false });

export const Map = () => {
  return (
    <div className="p-4">
      <AllDevices />
    </div>
  );
};

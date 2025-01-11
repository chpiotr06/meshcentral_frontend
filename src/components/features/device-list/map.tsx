"use client";

import dynamic from "next/dynamic";

const DeviceList = dynamic(() => import("./device-list"), { ssr: false });

export const Map = () => {
  return (
    <div className="p-4">
      <DeviceList />
    </div>
  );
};

"use client";

import dynamic from "next/dynamic";

const DeviceList = dynamic(() => import("./device-list"), { ssr: false });

export const Map = () => {
  return (
    <div className="grid grid-cols-3">
      <div></div>
      <div className="col-span-2">
        <DeviceList />
      </div>
    </div>
  );
};

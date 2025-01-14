"use client";

import { useState } from "react";
import { DevicesScrollable } from "./devices-scrollable";
import dynamic from "next/dynamic";

const RouteMap = dynamic(() => import("./route-map"), { ssr: false });

export const DevicesList = () => {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-4 p-4 gap-4">
      <DevicesScrollable setSelectedDevice={setSelectedDevice} />
      <div className="col-span-3">
        <RouteMap deviceUuid={selectedDevice} />
      </div>
    </div>
  );
};

"use client";

import { DevicesScrollable } from "./devices-scrollable";
import { RouteMap } from "./route-map";

export const DevicesList = () => {
  return (
    <div className="grid grid-cols-4 p-4 gap-4">
      <DevicesScrollable />
      <div className="col-span-3">
        <RouteMap />
      </div>
    </div>
  );
};

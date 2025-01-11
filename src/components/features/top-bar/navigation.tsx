"use client";

import * as React from "react";
import { useUserStore } from "@/state/store";

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { AdminNav } from "./admin-nav";
import { DeviceNav } from "./device-nav";

export function Navigation() {
  const user = useUserStore((state) => state.user);

  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList className="gap-2">
        <div className="text-lg select-none">MeshCentral</div>
        {user?.isAdmin && <AdminNav />}
        <DeviceNav />
      </NavigationMenuList>
    </NavigationMenu>
  );
}

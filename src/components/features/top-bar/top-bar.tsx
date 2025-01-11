"use client";

import { useLogoutMutation } from "@/api/hooks/auth/useLogoutMutation";
import { Button } from "@/components/ui/button";
import { Navigation } from "./navigation";

export const TopBar = () => {
  const { mutate } = useLogoutMutation();

  return (
    <div className="flex items-center border-b border-slate-700 h-14 justify-between p-4 z-50">
      <Navigation />
      <Button onClick={() => mutate()}>Wyloguj</Button>
    </div>
  );
};

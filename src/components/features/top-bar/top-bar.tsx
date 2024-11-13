"use client";

import { useLogoutMutation } from "@/api/hooks/auth/useLogoutMutation";
import { Button } from "@/components/ui/button";

export const TopBar = () => {
  const { mutate } = useLogoutMutation();

  return (
    <div className="flex items-center border-b border-slate-700 h-14 justify-end p-4">
      <Button onClick={() => mutate()}>Wyloguj</Button>
    </div>
  );
};

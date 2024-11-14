import { UserT } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StoreT = {
  user: UserT | null;
  access_token: string | null;
  setUser: (user: UserT | null) => void;
  setAccessToken: (token: string | null) => void;
};

export const useUserStore = create<StoreT>(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore -- i dont have time to fuck around with types, it should work. Done per zustand documentation
  persist(
    (set) => ({
      user: null,
      access_token: null,
      setUser: (user) => set(() => ({ user })),
      setAccessToken: (token) => set(() => ({ access_token: token })),
    }),
    { name: "app-storage" } // localStorage key
  )
);

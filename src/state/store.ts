import { UserT } from "@/types/user";
import { create } from "zustand";

export type StoreT = {
  user: UserT | null;
  access_token: string | null;
  setUser: (user: UserT) => void;
  setAccessToken: (token: string) => void;
};

export const useStore = create<StoreT>((set) => ({
  user: null,
  access_token: null,
  setUser: (user: UserT) => set(() => ({ user })),
  setAccessToken: (token: string) => set(() => ({ access_token: token })),
}));

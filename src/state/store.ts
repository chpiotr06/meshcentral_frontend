import { UserT } from "@/types/user";
import { create } from "zustand";

export type StoreT = {
  user: UserT | null;
  access_token: string | null;
  setUser: (user: UserT | null) => void;
  setAccessToken: (token: string | null) => void;
};

export const useStore = create<StoreT>((set) => ({
  user: null,
  access_token: null,
  setUser: (user) => set(() => ({ user })),
  setAccessToken: (token) => set(() => ({ access_token: token })),
}));

// store/useStore.ts
import { create } from "zustand";

type State = {
  username: string;
  isLoggedIn: boolean;
  setUser: (username: string) => void;
  logout: () => void;
};

export const useUserStore = create<State>((set) => ({
  username: "",
  isLoggedIn: false,
  setUser: (username) => set({ username, isLoggedIn: true }),
  logout: () => set({ username: "", isLoggedIn: false }),
}));

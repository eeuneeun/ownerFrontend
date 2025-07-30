// store/useStore.ts
import { create } from "zustand";

type Order = {
  orderId: string;
  status: boolean;
  setStatus: (orderId: string) => void;
  logout: () => void;
};

export const useOderStore = create<Order>((set) => ({
  orderId: "",
  status: false,
  setStatus: (orderId: string) => set({ orderId, status: true }),
  logout: () => set({ orderId: "", status: false }),
}));

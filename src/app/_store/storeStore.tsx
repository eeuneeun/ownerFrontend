import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  storeId: number;
  name: string;
  businessNum: string;
  postNum: string;
  description: string;
  tel: string;
  address: string;
  lat: number;
  longti: number;
  image: string;
  setStoreId: (id: number) => void;
  setStoreName: (id: string) => void;
  clearStoreId: () => void;
}

export const useStoreStore = create<StoreState>()(
  persist(
    (set) => ({
      storeId: 1,
      name: "신대방삼거리점",
      businessNum: "070-1234-5678",
      address: "서울특별시 동작구 어딘가",
      postNum: "06234",
      description: "인터넷 카페입니다.",
      tel: "02-1234-5678",
      lat: 43.535,
      longti: 114.55,
      image: "https://internet.com",
      setStoreId: (id) => set({ storeId: id }),
      setStoreName: (name) => set({ name: name }),
      clearStoreId: () => set({ storeId: 0 }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);

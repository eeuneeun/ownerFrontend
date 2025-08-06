import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  storeId: string;
  storeName: string;
  businessNum: string;
  postNum: string;
  description: string;
  phone: string;
  address: string;
  lat: number;
  longti: number;
  image: string;
  setStoreId: (id: string) => void;
  clearStoreId: () => void;
}

export const useStoreStore = create<StoreState>()(
  persist(
    (set) => ({
      storeId: "1",
      storeName: "신대방삼거리점",
      businessNum: "070-1234-5678",
      address: "서울특별시 동작구 어딘가",
      postNum: "06234",
      description: "인터넷 카페입니다.",
      phone: "02-1234-5678",
      lat: 43.535,
      longti: 114.55,
      image: "https://internet.com",
      setStoreId: (id) => set({ storeId: id }),
      clearStoreId: () => set({ storeId: "" }),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);

// store/useStore.ts
import { create } from "zustand";

type Img = {
  path: string;
  fileName: string;
  setImgData: (path: string, fileName: string) => void;
  clearImgData: () => void;
};

export const useImgStore = create<Img>((set) => ({
  path: "",
  fileName: "",
  setImgData: (path: string, fileName: string) =>
    set({ path: path, fileName: fileName }),
  clearImgData: () => set({ path: "", fileName: "" }),
}));

import { create } from "zustand";
import { persist, StateStorage } from "zustand/middleware";

// ★ SSR 경우 persist 마지막 인자로, 해당 부분 넣어줘야함
//   - 추후 체크 필요함 : 250806

// const storage: StateStorage =
//   typeof window !== "undefined"
//     ? localStorage
//     : {
//         getItem: () => null,
//         setItem: () => {},
//         removeItem: () => {},
//       };

interface User {
  id: string;
  name: string;
  // email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,

      // 로그인 시 토큰과 유저 정보 저장
      login: (token, user) =>
        set(() => ({
          accessToken: token,
          user,
        })),

      // 로그아웃
      logout: () =>
        set(() => ({
          accessToken: null,
          user: null,
        })),

      // 토큰만 갱신 (예: refresh token으로 받은 경우)
      setToken: (token) =>
        set(() => ({
          accessToken: token,
        })),
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);

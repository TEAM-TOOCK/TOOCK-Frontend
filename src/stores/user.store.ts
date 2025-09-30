import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

export interface UserState {
  memberId: number | null;
  name: string | null;
  email: string | null;

  // actions
  setUserProfile: (input: { memberId: number; name: string; email: string }) => void;
  patchUserProfile: (input: Partial<Pick<UserState, "memberId" | "name" | "email">>) => void;
  resetProfile: () => void;
}

const initialProfile = {
  memberId: null,
  name: null,
  email: null,
} as const;

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        ...initialProfile,

        setUserProfile: ({ memberId, name, email }) => set({ memberId, name, email }),

        patchUserProfile: (input) => set((s) => ({ ...s, ...input })),

        // 토큰은 유지하고 프로필만 초기화하고 싶을 때
        resetProfile: () => set((s) => ({ ...s, ...initialProfile })),
      }),
      {
        name: "user-session", // sessionStorage key
        storage: createJSONStorage(() => sessionStorage),
        version: 1,
      }
    )
  )
);

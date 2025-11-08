import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type InterviewSessionState = {
  /** 서버가 내려주는 세션 식별자 */
  sessionId: number | null;
  /** 현재 질문 텍스트 */
  questionText: string | null;

  setSessionId: (input: { sessionId: number }) => void;

  /** 세션/질문 셋업 (API 응답 직후 1회 호출) */
  setSession: (input: { sessionId: number; questionText: string }) => void;

  /** 질문만 교체(다음 질문 받을 때 등) */
  setQuestion: (questionText: string) => void;

  /** 세션 종료/초기화 */
  clearSession: () => void;
};

export const useInterviewSessionStore = create<InterviewSessionState>()(
  persist(
    (set) => ({
      sessionId: null,
      questionText: null,

      setSessionId: ({ sessionId }) => set({ sessionId }),

      setSession: ({ sessionId, questionText }) => set({ sessionId, questionText }),

      setQuestion: (questionText) => set({ questionText }),

      clearSession: () => set({ sessionId: null, questionText: null }),
    }),
    {
      name: "interview-session", // sessionStorage 키
      version: 1,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

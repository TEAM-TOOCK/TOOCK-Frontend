import { INIT_INTERVIEW_OPTION, InterviewOptionData } from "@/app/interview-setup/constants/interviewSetting.constants";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type InterviewState = {
  selectedCompany: InterviewOptionData;
  selectedFieldCategory: InterviewOptionData;
  selectedField: InterviewOptionData;
  setSelectedCompany: (value: InterviewOptionData) => void;
  setSelectedFieldCategory: (value: InterviewOptionData) => void;
  setSelectedField: (value: InterviewOptionData) => void;
  reset: () => void;
};

const initialInterviewOption = {
  id: -1,
  label: "",
  value: "",
};

export const useInterviewStore = create<InterviewState>()(
  persist(
    (set) => ({
      selectedCompany: INIT_INTERVIEW_OPTION,
      selectedFieldCategory: INIT_INTERVIEW_OPTION,
      selectedField: INIT_INTERVIEW_OPTION,
      setSelectedCompany: (value) => set({ selectedCompany: value }),
      setSelectedFieldCategory: (value) => set({ selectedFieldCategory: value }),
      setSelectedField: (value) => set({ selectedField: value }),
      reset: () =>
        set({
          selectedCompany: INIT_INTERVIEW_OPTION,
          selectedFieldCategory: INIT_INTERVIEW_OPTION,
          selectedField: INIT_INTERVIEW_OPTION,
        }),
    }),
    {
      name: "interview-store",
      // storage: createJSONStorage(() => localStorage),
    }
  )
);

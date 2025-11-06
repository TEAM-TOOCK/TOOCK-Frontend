import { InterviewOptionData } from "@/app/interview-setup/constants/interviewSetting.constants";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type InterviewState = {
  selectedCompany: InterviewOptionData;
  selectedField: InterviewOptionData;
  selectedJob: InterviewOptionData;
  setSelectedCompany: (value: InterviewOptionData) => void;
  setSelectedField: (value: InterviewOptionData) => void;
  setSelectedJob: (value: InterviewOptionData) => void;
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
      selectedCompany: initialInterviewOption,
      selectedField: initialInterviewOption,
      selectedJob: initialInterviewOption,
      setSelectedCompany: (value) => set({ selectedCompany: value }),
      setSelectedField: (value) => set({ selectedField: value }),
      setSelectedJob: (value) => set({ selectedJob: value }),
      reset: () => set({ selectedCompany: initialInterviewOption, selectedJob: initialInterviewOption }),
    }),
    {
      name: "interview-store",
      // storage: createJSONStorage(() => localStorage),
    }
  )
);

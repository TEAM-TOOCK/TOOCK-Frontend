import { Field } from "@/app/api/interview/fetchInterviewQuestions";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type InterviewState = {
  selectedCompany: string;
  selectedField: Field;
  selectedJob: string;
  setSelectedCompany: (value: string) => void;
  setSelectedField: (value: Field) => void;
  setSelectedJob: (value: string) => void;
  reset: () => void;
};

export const useInterviewStore = create<InterviewState>()(
  persist(
    (set) => ({
      selectedCompany: "",
      selectedField: "",
      selectedJob: "",
      setSelectedCompany: (value) => set({ selectedCompany: value }),
      setSelectedField: (value) => set({ selectedField: value }),
      setSelectedJob: (value) => set({ selectedJob: value }),
      reset: () => set({ selectedCompany: "", selectedJob: "" }),
    }),
    {
      name: "interview-store",
      // storage: createJSONStorage(() => localStorage),
    }
  )
);

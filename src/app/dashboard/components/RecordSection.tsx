"use client";

import { fetchInterviewRecords } from "@/app/api/interview/fetchInterviewRecords";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MoonLoader } from "react-spinners";
import RecordCard from "./RecordCard";
import {
  INIT_INTERVIEW_OPTION,
  INTERVIEW_COMPANY_LIST,
  INTERVIEW_FIELD_CATEGORY,
  INTERVIEW_FIELD_LIST,
  InterviewOptionData,
} from "@/app/interview-setup/constants/interviewSetting.constants";

interface Props {
  userInput: string;
  selectedCompany: InterviewOptionData;
  selectedFieldCategory: InterviewOptionData;
  selectedField: InterviewOptionData;
  setSelectedCompany: React.Dispatch<React.SetStateAction<InterviewOptionData>>;
  setSelectedFieldCategory: React.Dispatch<React.SetStateAction<InterviewOptionData>>;
  setSelectedField: React.Dispatch<React.SetStateAction<InterviewOptionData>>;
}

const RecordSection = ({
  userInput,
  selectedCompany,
  selectedFieldCategory,
  selectedField,
  setSelectedCompany,
  setSelectedFieldCategory,
  setSelectedField,
}: Props) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["interview-records"],
    queryFn: () => fetchInterviewRecords(),
  });

  const filteredData = data?.filter((v) => {
    if (userInput) {
      setSelectedCompany(INIT_INTERVIEW_OPTION);
      setSelectedFieldCategory(INIT_INTERVIEW_OPTION);
      setSelectedField(INIT_INTERVIEW_OPTION);
      return (
        v.companyName.includes(userInput) || v.interviewFieldCategory.includes(userInput) || v.field.includes(userInput)
      );
    } else {
      const matchCompany = !selectedCompany.value || v.companyName === selectedCompany.value;

      const matchCategory = !selectedFieldCategory.value || v.interviewFieldCategory === selectedFieldCategory.value;

      const matchField = !selectedField.value || v.field === selectedField.value;

      return matchCompany && matchCategory && matchField;
    }
  });

  return (
    <>
      {/* <div className="flex items-center justify-center w-full h-full">
        <MoonLoader />
      </div> */}
      {isPending ? (
        <div className="flex items-center justify-center w-full h-full">
          <MoonLoader color={"white"} />
        </div>
      ) : (
        filteredData &&
        filteredData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full rounded-md p-3 bg-blue-1 drop-shadow-sm">
            {filteredData.map((v) => {
              console.log("filtered:", v);
              const company = INTERVIEW_COMPANY_LIST.find((item) => item.value === v.companyName)!;
              const fieldCategory = INTERVIEW_FIELD_CATEGORY.find((item) => item.value === v.interviewFieldCategory)!;
              const field = INTERVIEW_FIELD_LIST.find((item) => item.value === v.field)!;

              return (
                <RecordCard
                  key={v.interviewSessionId}
                  id={v.interviewSessionId}
                  company={company}
                  fieldCategory={fieldCategory}
                  field={field}
                  date={v.date}
                  totalScore={v.maxScore}
                  totalQuestionNum={v.questionCount}
                />
              );
            })}
          </div>
        )
      )}
    </>
  );
};

export default RecordSection;

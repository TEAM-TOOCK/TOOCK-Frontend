"use client";

import { fetchInterviewRecords } from "@/app/api/interview/fetchInterviewRecords";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MoonLoader } from "react-spinners";
import RecordCard from "./RecordCard";
import { INIT_INTERVIEW_OPTION, InterviewOptionData } from "@/app/interview-setup/constants/interviewSetting.constants";

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

  const filteredData = data?.data.filter((v) => {
    if (userInput) {
      setSelectedCompany(INIT_INTERVIEW_OPTION);
      setSelectedFieldCategory(INIT_INTERVIEW_OPTION);
      setSelectedField(INIT_INTERVIEW_OPTION);
      return v.company.includes(userInput) || v.job.includes(userInput);
    } else {
      if (selectedCompany && !selectedJob) {
        return v.company === selectedCompany;
      } else if (!selectedCompany && selectedJob) {
        return v.job === selectedJob;
      } else if (selectedCompany && selectedJob) {
        return v.company === selectedCompany && v.job === selectedJob;
      } else {
        return true;
      }
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

              return (
                <RecordCard
                  key={v.id}
                  id={v.id}
                  company={v.company}
                  job={v.job}
                  date={v.date}
                  totalScore={v.totalScore}
                  totalQuestionNum={v.totalQuestionNum}
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

"use client";

import { fetchCompanyAndJobList } from "@/app/api/interview/fetchCompanyJobList";
import Dropdown from "@/app/ui/Dropdown/Dropdown";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MagnifyingGlasses from "@/assets/magnifying-glasses.svg";
import Reset from "@/assets/reset.svg";
import {
  INIT_INTERVIEW_OPTION,
  INTERVIEW_COMPANY_LIST,
  INTERVIEW_FIELD_CATEGORY,
  INTERVIEW_FIELD_LIST,
  InterviewOptionData,
} from "@/app/interview-setup/constants/interviewSetting.constants";

interface Props {
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCompany: React.Dispatch<React.SetStateAction<InterviewOptionData>>;
  setSelectedFieldCategory: React.Dispatch<React.SetStateAction<InterviewOptionData>>;
  setSelectedField: React.Dispatch<React.SetStateAction<InterviewOptionData>>;
  selectedCompany: InterviewOptionData;
  selectedFieldCategory: InterviewOptionData;
  selectedField: InterviewOptionData;
  color?: string;
  bgColor?: string;
}

const SearchBar = ({
  setUserInput,
  setSelectedCompany,
  setSelectedFieldCategory,
  setSelectedField,
  selectedCompany,
  selectedFieldCategory,
  selectedField,
  color,
  bgColor,
}: Props) => {
  // const { isPending, isError, data, error } = useQuery({
  //   queryKey: ["company-job-list"],
  //   queryFn: () => fetchCompanyAndJobList(),
  // });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const resetBtnClickHandler = () => {
    setSelectedCompany(INIT_INTERVIEW_OPTION);
    setSelectedFieldCategory(INIT_INTERVIEW_OPTION);
    setSelectedField(INIT_INTERVIEW_OPTION);
    setUserInput("");
  };

  return (
    <div className="flex flex-col items-center sm:flex-col gap-3 w-full h-auto p-3 rounded-md shadow-sm bg-blue-1">
      <div
        className="flex flex-row items-center justify-start gap-3 w-full h-[2.5rem] rounded-md px-3 py-1"
        style={{ color: color, borderColor: color, backgroundColor: bgColor }}
      >
        <MagnifyingGlasses width={"1.2rem"} height={"1.2rem"} />
        <input
          className="w-full h-full"
          type="text"
          placeholder="기업명 또는 직무를 입력하세요"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-row items-center justify-between gap-3 w-full">
        <div className="w-[50%]">
          <Dropdown
            dataList={INTERVIEW_COMPANY_LIST ?? []}
            onChange={setSelectedCompany}
            value={selectedCompany}
            color={"#162456"}
            bgColor={"white"}
          />
        </div>
        <div className="w-[50%]">
          <Dropdown
            dataList={INTERVIEW_FIELD_CATEGORY ?? []}
            onChange={setSelectedFieldCategory}
            value={selectedFieldCategory}
            color={"#162456"}
            bgColor={"white"}
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-between gap-3 w-full">
        <div className="w-[50%]">
          <Dropdown
            dataList={INTERVIEW_FIELD_LIST ?? []}
            onChange={setSelectedField}
            value={selectedField}
            color={"#162456"}
            bgColor={"white"}
          />
        </div>
        <div className="w-[50%] flex flex-col items-center justify-center">
          <div
            className="flex items-center justify-center w-[2rem] h-[2rem] bg-blue-950 rounded-full"
            onClick={resetBtnClickHandler}
          >
            <Reset width={"1rem"} height={"1rem"} color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

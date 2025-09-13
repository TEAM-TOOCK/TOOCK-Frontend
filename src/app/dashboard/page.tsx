"use client";

import TopNav from "./components/TopNav";
import StatSection from "./components/StatSection";
import SearchBar from "./components/SearchBar";
import RecordSection from "./components/RecordSection";
import { useState } from "react";
import ToockPromo from "./components/ToockPromo";

const Page = () => {
  const [userInput, setUserInput] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedJob, setSelectedJob] = useState<string>("");

  return (
    <div className="flex flex-col justify-between items-center bg-white w-full min-h-dvh">
      <TopNav />
      <div className="flex flex-col justify-start gap-10 sm:gap-5 w-[100%] sm:w-[70%] my-5 p-3 sm:p-0 flex-1">
        <ToockPromo />
        <StatSection />
        <div className="flex flex-col gap-5">
          <SearchBar
            setUserInput={setUserInput}
            setSelectedCompany={setSelectedCompany}
            setSelectedJob={setSelectedJob}
            selectedCompany={selectedCompany}
            selectedJob={selectedJob}
            bgColor={"white"}
            color={"var(--color-blue-950)"}
          />
          <RecordSection
            userInput={userInput}
            selectedCompany={selectedCompany}
            selectedJob={selectedJob}
            setSelectedCompany={setSelectedCompany}
            setSelectedJob={setSelectedJob}
          />
        </div>
      </div>
      <div className="flex items-center justify-center w-full h-[10rem] bg-slate-100 text-slate-500">
        건국대 2025 졸업 프로젝트 3조 안태규 김민석 김기훈
      </div>
    </div>
  );
};

export default Page;

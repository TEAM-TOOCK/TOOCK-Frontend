"use client";

import React, { useEffect, useState } from "react";
import InterviewContainer from "./components/InterviewContainer";
import { fetchInterviewQuestions } from "../api/interview/fetchInterviewQuestions";
import { useQuery } from "@tanstack/react-query";
import { useInterviewStore } from "@/stores/interview.store";
import MoonLoader from "react-spinners/MoonLoader";

const Page = () => {
  const company = useInterviewStore((s) => s.selectedCompany);
  const job = useInterviewStore((s) => s.selectedJob);
  const [questionNum, setQuestionNum] = useState<number>(0);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["questions", company, job],
    queryFn: () => fetchInterviewQuestions(company, job),
  });

  return (
    <div className="p-3 h-full bg-white">
      {data ? (
        <InterviewContainer
          question={data.data[questionNum].question}
          qNum={questionNum}
          setQuestionNum={setQuestionNum}
        />
      ) : (
        <div className="flex justify-center items-center h-full">
          <MoonLoader />
        </div>
      )}
    </div>
  );
};

export default Page;

"use client";

import React, { useState } from "react";
import InterviewContainer from "./components/InterviewContainer";

const Page = () => {
  const [questionNum, setQuestionNum] = useState<number>(0);

  return (
    <div className="p-3 h-full bg-white">
      <InterviewContainer qNum={questionNum} setQuestionNum={setQuestionNum} />
    </div>
  );
};

export default Page;

import { InterviewQandA } from "@/app/api/interview/fetchInterviewResults";
import React from "react";

const QAndAContents = ({ data }: { data: InterviewQandA[] }) => {
  return (
    <div className="flex flex-col justify-start gap-3 w-full">
      {data.map((v) => {
        return (
          <div key={v.interviewQAId} className="flex flex-col gap-3">
            <div className="flex flex-row justify-start items-center gap-3">
              <div className="px-2 font-semibold rounded-xl border">Q{v.questionOrder}</div>
              {v.questionText}
            </div>
            <div className="w-full p-3 rounded-md bg-slate-300">
              <div>{v.answerText}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QAndAContents;

"use client";

import { InterviewOptionData } from "@/app/interview-setup/constants/interviewSetting.constants";
import { useInterviewStore } from "@/stores/interview.store";
import { useInterviewSessionStore } from "@/stores/interviewSession.store";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  id: number;
  company: InterviewOptionData;
  fieldCategory: InterviewOptionData;
  field: InterviewOptionData;
  date: string;
  totalScore: number;
  totalQuestionNum: number;
}

const RecordCard = ({ id, company, fieldCategory, field, date, totalScore, totalQuestionNum }: Props) => {
  const setSessionId = useInterviewSessionStore((s) => s.setSessionId);
  const setSelectedCompany = useInterviewStore((s) => s.setSelectedCompany);
  const setSelectedField = useInterviewStore((s) => s.setSelectedField);
  const router = useRouter();
  const cardClickHandler = () => {
    setSessionId({ sessionId: id });
    setSelectedCompany(company);
    setSelectedField(field);
    router.push(`/interview-result`);
  };
  return (
    <div
      className="flex flex-col justify-start items-center gap-1 p-3 rounded-md bg-white drop-shadow cursor-pointer"
      onClick={cardClickHandler}
    >
      <div className="flex flex-row justify-start items-center gap-3 w-full">
        <div className="font-semibold text-xl text-blue-950">{company.label}</div>
        <div className="rounded-xl bg-slate-500 text-white text-sm px-3">{field.label}</div>
      </div>
      <div className="flex flex-row justify-start items-center w-full text-sm text-slate-400">{date}</div>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="font-semibold px-3 rounded-xl border-1 border-blue-500 bg-blue-200 text-blue-950">
          {totalScore}/10
        </div>
        <div className="text-sm text-slate-400">{totalQuestionNum}개 질문</div>
      </div>
    </div>
  );
};

export default RecordCard;

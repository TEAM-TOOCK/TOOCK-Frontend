"use client";

import { fetchInterviewResults } from "@/app/api/interview/fetchInterviewResults";
import { useInterviewStore } from "@/stores/interview.store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { COLUMN1, COLUMN2 } from "../constants/InterviewResults.contants";
import ResultCard from "./ResultCard";
import TotalScoreContentsComp from "./TotalScoreContents";
import DetailScoreContents from "./DetailScoreContents";
import AbilityDistributionContents from "./AbilityDistributionContents";
import QAndAContents from "./QAndAContents";
import ImprovementsProposalContents from "./ImprovementsProposalContents";
import { useInterviewSessionStore } from "@/stores/interviewSession.store";
import { detailEvaluation, improvementsProposal } from "../utils/resultDataParser";

const InterviewResultContainer = () => {
  const company = useInterviewStore((s) => s.selectedCompany);
  const job = useInterviewStore((s) => s.selectedJob);
  const sessionId = useInterviewSessionStore((s) => s.sessionId);

  // const search = useSearchParams();
  // const mode = search.get("mode") as "result" | "record";
  // let recordId = null;
  // if (mode === "record") {
  //   recordId = Number(search.get("id"));
  // }

  // 경우에 따라 면접 결과를 불러오거나, 아니면 저장된 기존 면접 데이터를 가져옵니다
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["interview-results", sessionId],
    queryFn: () => {
      if (sessionId) {
        return fetchInterviewResults(sessionId);
      }
    },
    enabled: !!sessionId, // 값 준비되면 호출
  });

  const getContentOfColumn1 = (item: (typeof COLUMN1)[number]) => {
    if (item.title === "종합 점수" && data) {
      return <TotalScoreContentsComp data={data.totalScore} />;
    } else if (item.title === "세부 평가" && data) {
      return <DetailScoreContents data={detailEvaluation(data)} />;
    } else if (item.title === "역량 분포" && data) {
      return <AbilityDistributionContents data={detailEvaluation(data)} />;
    }
    return null;
  };

  const getContentOfColumn2 = (item: (typeof COLUMN2)[number]) => {
    if (item.title === "AI 피드백" && data) {
      return <div>{data.aiFeedback}</div>;
    } else if (item.title === "질문 및 답변 기록" && data) {
      return <QAndAContents data={data.qaRecords} />;
    } else if (item.title === "개선 제안" && data) {
      return <ImprovementsProposalContents data={improvementsProposal(data)} />;
    }
    return null;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-start w-full h-full sm:w-[70%] bg-white my-3 gap-5">
      <div className="flex flex-col justify-start gap-5 w-full h-full px-3 sm:w-[40%]">
        {COLUMN1.map((v) => {
          return <ResultCard key={v.id} title={v.title} subtitle={v.subtitle} content={getContentOfColumn1(v)} />;
        })}
      </div>
      <div className="flex flex-col justify-start gap-5 w-full h-full px-3 sm:w-[60%]">
        {COLUMN2.map((v) => {
          return <ResultCard key={v.id} title={v.title} subtitle={v.subtitle} content={getContentOfColumn2(v)} />;
        })}
      </div>
    </div>
  );
};

export default InterviewResultContainer;

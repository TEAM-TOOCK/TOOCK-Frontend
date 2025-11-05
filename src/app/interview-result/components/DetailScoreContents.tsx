import ProgressBar from "@/app/ui/ProgressBar/ProgressBar";
import React from "react";
import { getAbilName } from "../utils/interviewUtils";

export interface InterviewDetailScore {
  technicalExpertiseScore: number;
  softSkillsScore: number;
  problemSolvingScore: number;
  growthPotentialScore: number;
}

const DetailScoreContents = ({ data }: { data: InterviewDetailScore }) => {
  return (
    <div className="flex flex-col justify-start gap-3 w-full">
      {Object.entries(data).map((v) => {
        return (
          <div key={v[0]} className="flex flex-col justify-start items-center w-full">
            <div className="flex flex-row gap-3 justify-between items-center">
              <div className="font-bold">{getAbilName(v[0])}</div>
              <div className="font-semibold">{v[1]}/10</div>
            </div>
            <ProgressBar bgColor={"white"} color={"#3b82f6"} percentage={v[1] * 10} height={"1rem"} />
          </div>
        );
      })}
    </div>
  );
};

export default DetailScoreContents;

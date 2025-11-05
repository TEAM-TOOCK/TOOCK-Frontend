import React from "react";
import { getAbilName } from "../utils/interviewUtils";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer } from "recharts";
import { InterviewDetailScore } from "./DetailScoreContents";

const AbilityDistributionContents = ({ data }: { data: InterviewDetailScore }) => {
  const dataFormatter = (src: InterviewDetailScore) => {
    return Object.entries(src).map((v) => {
      return { subject: getAbilName(v[0]), value: v[1] };
    });
  };
  return (
    <div className="flex items-center justify-center w-full h-64">
      <ResponsiveContainer>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          width={400}
          height={400}
          data={dataFormatter(data)}
          margin={{ top: 0, right: 60, bottom: 0, left: 60 }}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: "#ccc" }} />
          <PolarRadiusAxis angle={30} domain={[0, 10]} />
          <Radar name="역량" dataKey="value" stroke="#4F9DDE" fill="#4F9DDE" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AbilityDistributionContents;

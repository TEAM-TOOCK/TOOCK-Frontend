import React from "react";

interface ImprovementsProposal {
  strengths: string[];
  improvements: string[];
}

const ImprovementsProposalContents = ({ data }: { data: ImprovementsProposal }) => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div>
        <div className="font-semibold text-xl text-blue-600">강점</div>
        <ul className="list-disc list-inside">
          {data.strengths.map((v, index) => {
            return (
              <li key={index} className="text-sm font-medium">
                {v}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <div className="font-semibold text-xl text-red-600">약점</div>
        <ul className="list-disc list-inside">
          {data.improvements.map((v, index) => {
            return (
              <li key={index} className="text-sm font-medium">
                {v}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ImprovementsProposalContents;

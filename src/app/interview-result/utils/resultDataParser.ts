import { InterviewResult } from "@/app/api/interview/fetchInterviewResults";

export const detailEvaluation = (data: InterviewResult) => {
  const { technicalExpertiseScore, softSkillsScore, problemSolvingScore, growthPotentialScore } = data;
  const result = { technicalExpertiseScore, softSkillsScore, problemSolvingScore, growthPotentialScore };
  return result;
};

export const improvementsProposal = (data: InterviewResult) => {
  const { strengths, improvements } = data;
  const result = { strengths, improvements };
  return result;
};

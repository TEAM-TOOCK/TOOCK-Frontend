import { ApiResponse, client } from "../client";

export type InterviewQandA = {
  interviewQAId: number;
  questionOrder: number;
  followUpOrder: number;
  questionText: string;
  answerText: string;
  s3Url: string;
  evaluation: string;
  score: number;
  fieldCategory: string;
};

export interface InterviewResult {
  interviewAnalysisId: number;
  interviewSessionId: number;
  totalScore: number;
  technicalExpertiseScore: number;
  softSkillsScore: number;
  problemSolvingScore: number;
  growthPotentialScore: number;
  aiFeedback: string;
  qaRecords: InterviewQandA[];
  strengths: string[];
  improvements: string[];
}

export interface InterviewResultApiResponse extends ApiResponse {
  data: InterviewResult;
}

export const fetchInterviewResults = async (sessionId: number) => {
  try {
    const response = await client.get(`interviews/results/details/${sessionId}`).json<InterviewResultApiResponse>();
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("[Interview Results Fetch Error]", error);
    return null;
  }
};

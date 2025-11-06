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

export interface InterviewAnalyze {
  id: number;
  interviewSessionId: number;
  score: number;
  technicalExpertiseScore: number;
  softSkillsScore: number;
  problemSolvingScore: number;
  growthPotentialScore: number;
  summary: string;
}

export const analyzeInterview = async (sessionId: number) => {
  try {
    const response = await client.post(`interviews/analyze/${sessionId}`).json<ApiResponse<InterviewAnalyze>>();
    return response.success;
  } catch (error) {
    console.error("[Interview Analyze Error]", error);
    throw Error("[Interview Analyze Error]");
  }
};

export const fetchInterviewResults = async (sessionId: number) => {
  try {
    const response = await client.get(`interviews/results/details/${sessionId}`).json<ApiResponse<InterviewResult>>();
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("[Interview Results Fetch Error]", error);
    return null;
  }
};

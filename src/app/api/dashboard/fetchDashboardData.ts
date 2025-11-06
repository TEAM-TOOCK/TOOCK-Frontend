import { ApiResponse, client } from "../client";

export interface InterviewStatistics {
  totalInterviews: number;
  averageScore: number;
  bestScore: number;
  interviewThisWeek: number;
}

export const fetchInterviewStatistics = async (): Promise<InterviewStatistics | undefined> => {
  try {
    const response = await client.get(`users/statistics`).json<ApiResponse<InterviewStatistics>>();
    return response.data;
  } catch (error) {
    console.error("[Interview Record Detail Fetch Error]", error);
  }
};

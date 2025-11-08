import { InterviewOptionData } from "@/app/interview-setup/constants/interviewSetting.constants";
import { ApiResponse, client } from "../client";

interface InterviewRecord {
  interviewSessionId: number;
  companyName: string;
  interviewFieldCategory: string;
  field: string;
  date: string;
  score: number;
  maxScore: number;
  questionCount: number;
}

export const fetchInterviewRecords = async () => {
  try {
    const response = await client.get(`users/interviews`).json<ApiResponse<InterviewRecord[]>>();
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("[Interview Records Fetch Error]", error);
    throw new Error("[Interview Records Fetch Error]");
  }
};

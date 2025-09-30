import { ApiResponse, client } from "../client";

export interface InterviewQuestion {
  interviewSessionId: number;
  questionText: string;
}

interface InterviewQuestionApiResponse extends ApiResponse {
  data: InterviewQuestion;
}

const FIELD = ["개발", "데이터", "연구개발", ""] as const;
export type Field = (typeof FIELD)[number];

export const initiateInterview = async (company: string, field: Field, job: string) => {
  try {
    const response = await client.post("interviews/start").json<InterviewQuestionApiResponse>();
    return response.data;
  } catch (error) {
    throw new Error("[initiate interview error]");
  }
};

export const fetchInterviewQuestions = async (company: string, job: string) => {
  try {
    const response = await client
      .get(`interview-questions?company=${company}&job=${job}`)
      .json<InterviewQuestionApiResponse>();
    console.log(response);
    return response;
  } catch (error) {
    console.error("[Interview Question Fetch Error]", error);
    return null;
  }
};

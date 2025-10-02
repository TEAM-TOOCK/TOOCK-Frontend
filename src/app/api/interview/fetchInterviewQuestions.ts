import { ApiResponse, client } from "../client";

export interface InitialInterviewQuestion {
  interviewSessionId: number;
  questionText: string;
}

export interface InterviewQuestion {
  questionText: string;
  finished: boolean;
}

export interface InitialInterviewQuestionApiResponse extends ApiResponse {
  data: InitialInterviewQuestion;
}

export interface InterviewQuestionApiResponse extends ApiResponse {
  data: InterviewQuestion;
}

const FIELD = ["개발", "데이터", "연구개발", ""] as const;
export type Field = (typeof FIELD)[number];

export const initiateInterview = async (company: string, field: Field, job: string) => {
  try {
    const response = await client.post("interviews/start").json<InitialInterviewQuestionApiResponse>();
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
    return response.data;
  } catch (error) {
    console.error("[Interview Question Fetch Error]", error);
    return null;
  }
};

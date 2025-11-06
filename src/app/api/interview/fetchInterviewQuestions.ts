import { ApiResponse, client } from "../client";

/**
 * 첫 면접질문 형식
 */
export interface InitialInterviewQuestion {
  interviewSessionId: number;
  questionText: string;
}

/**
 * 처음 이외의 면접 질문 형식
 */
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

export const initiateInterview = async (company: string, field: string, job: string) => {
  try {
    const data = {
      companyName: company,
      fieldCategory: field,
      field: job,
    };
    const response = await client.post("interviews/start", { json: data }).json<InitialInterviewQuestionApiResponse>();
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("[initiate interview error]");
  }
};

export const sendInterviewData = async (interviewSessionId: number, audioFile: Blob) => {
  if (!audioFile) {
    alert("업로드할 녹음이 없습니다.");
    return;
  }

  const form = new FormData();
  const ext = audioFile.type.includes("ogg") ? "ogg" : audioFile.type.includes("mp4") ? "m4a" : "webm";
  form.append("audioFile", audioFile, `record.${ext}`);
  form.append("interviewSessionId", String(interviewSessionId));

  try {
    const response = await client
      .post("interviews/next", {
        body: form,
      })
      .json<InterviewQuestionApiResponse>();
    console.log("결과:", response);
    return response.data;
  } catch (err) {
    console.error("업로드 실패:", err);
    throw Error("업로드 실패");
  }
};

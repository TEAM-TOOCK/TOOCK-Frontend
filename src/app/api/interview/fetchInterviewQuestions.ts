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

// export const fetchInterviewQuestions = async (company: string, job: string) => {
//   try {
//     const response = await client
//       .get(`interview-questions?company=${company}&job=${job}`)
//       .json<InterviewQuestionApiResponse>();
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.error("[Interview Question Fetch Error]", error);
//     return null;
//   }
// };

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

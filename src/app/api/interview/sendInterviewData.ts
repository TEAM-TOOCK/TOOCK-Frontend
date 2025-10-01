import { client } from "../client";
import { InterviewQuestionApiResponse } from "./fetchInterviewQuestions";

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

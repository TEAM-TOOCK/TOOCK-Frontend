"use client";

import React from "react";
import QuestionBox from "./QuestionBox";
import AnswerBox from "./AnswerBox";
import Button from "@/app/ui/Button";
import { useAudioRecorder } from "@/utils/useAudioRecorder";
import { useInterviewDataStore } from "@/stores/interviewData.store";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { MoonLoader } from "react-spinners";
import { useInterviewSessionStore } from "@/stores/interviewSession.store";
import { InterviewQuestion, sendInterviewData } from "@/app/api/interview/fetchInterviewQuestions";

interface Props {
  qNum: number;
  setQuestionNum: React.Dispatch<React.SetStateAction<number>>;
}

const InterviewContainer = ({ qNum, setQuestionNum }: Props) => {
  const router = useRouter();
  const { isRecording, start, stop, reset, audioURL, audioBlob } = useAudioRecorder();
  // global state
  const sessionId = useInterviewSessionStore((s) => s.sessionId);
  const question = useInterviewSessionStore((s) => s.questionText);
  const setQuestion = useInterviewSessionStore((s) => s.setQuestion);

  const sendResponseMutation = useMutation({
    mutationFn: () => {
      if (sessionId === null) {
        throw new Error("Session ID is not available");
      }
      return sendInterviewData(sessionId, audioBlob as Blob);
    },
  });

  const nextBtnHandler = async () => {
    sendResponseMutation.mutate(undefined, {
      onSuccess: (data: InterviewQuestion | undefined) => {
        if (data) {
          if (data?.finished) {
            router.push("/interview-result");
          }
          setQuestionNum((prev) => (prev += 1));
          setQuestion(data.questionText);
        }
      },
    });
  };
  return (
    <>
      {sendResponseMutation.isPending ? (
        <div className="flex items-center justify-center w-full h-[30rem]">
          <MoonLoader />
        </div>
      ) : (
        <div className="flex flex-col gap-3 w-full h-[30rem]">
          <QuestionBox question={question as string} qNum={qNum} />
          <AnswerBox key={`q-${qNum}`} isRecording={isRecording} start={start} stop={stop} audioURL={audioURL} />
          <div className="flex flex-row items-center justify-end">
            <div className="flex flex-row gap-3">
              {/* <Button
                label={"건너뛰기"}
                clickHandler={() => setQuestionNum((prev) => prev + 1)}
                border="solid var(--color-blue-950) 1px"
                color="var(--color-blue-950)"
              /> */}
              <Button label={"다음 질문"} clickHandler={nextBtnHandler} bgColor="var(--color-blue-950)" color="white" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewContainer;

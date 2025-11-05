import Button from "@/app/ui/Button";
import React from "react";
import Play from "@/assets/play.svg";
import { useBrowserTTS } from "@/utils/useBrowserTTS";

const QuestionBox = ({ question, qNum }: { question: string; qNum: number }) => {
  const { speakQuestion, isSpeaking, isSupported } = useBrowserTTS({ question, qNum });
  const listenAgainBtnClickHandler = () => {
    speakQuestion();
  };

  return (
    <div className="flex flex-col justify-between w-full h-auto bg-slate-400 rounded-md p-3 gap-1">
      <div className="flex flex-row justify-between items-center">
        <div className="text-xl font-semibold">질문 {qNum + 1}</div>
        <Button
          label={"다시 듣기"}
          clickHandler={listenAgainBtnClickHandler}
          icon={<Play width="0.7rem" height="0.7rem" />}
          border="solid var(--color-blue-950) 1px"
          width="7rem"
        />
      </div>
      <div>{question}</div>
    </div>
  );
};

export default QuestionBox;

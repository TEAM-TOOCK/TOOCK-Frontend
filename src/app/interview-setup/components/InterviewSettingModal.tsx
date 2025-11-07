import { useInterviewStore } from "@/stores/interview.store";
import React, { CSSProperties, useEffect } from "react";
import { INTERVIEW_RULES_DETAIL } from "../constants/interviewRules.constants";
import Button from "@/app/ui/Button";
import { useRouter } from "next/navigation";
import { InitialInterviewQuestion, initiateInterview } from "@/app/api/interview/fetchInterviewQuestions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useInterviewSessionStore } from "@/stores/interviewSession.store";
import { PulseLoader } from "react-spinners";

const InterviewSettingModal = ({ setIsModal }: { setIsModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const company = useInterviewStore((s) => s.selectedCompany);
  const field = useInterviewStore((s) => s.selectedField);
  const job = useInterviewStore((s) => s.selectedJob);
  const router = useRouter();

  const { mutate, isPending, isError, data, error } = useMutation({
    mutationFn: () => initiateInterview(company.value, field.value, job.value),
    onSuccess: (data: InitialInterviewQuestion) => {
      useInterviewSessionStore.getState().setSession({
        sessionId: data.interviewSessionId,
        questionText: data.questionText,
      });
      router.push(`/interview`);
    },
    onError: (error: Error) => {
      console.error("Interview initiation failed:", error);
      alert("면접 시작 중 오류가 발생했습니다.");
    },
  });

  const cancelBtnClickHandler = () => {
    setIsModal(false);
  };

  const startInterviewBtnClickHandler = () => {
    mutate();
  };

  return (
    <div className="relative flex flex-col justify-between w-full h-full text-blue-950 p-4">
      {isPending && (
        <>
          {/* 반투명 오버레이 */}
          <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-black/50 z-10" />
          {/* 로딩 스피너 (오버레이보다 높은 z-index) */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-2xl z-20">
            <PulseLoader color={"var(--color-blue-950)"} />
          </div>
        </>
      )}

      <div>
        <div className="flex justify-center items-center text-2xl">면접 준비</div>
        <div className="flex justify-center items-center text-sm text-slate-400">
          {company.label}-{job.label} 면접을 시작합니다!
        </div>
      </div>
      <div>
        <ul className="list-disc list-inside">
          {INTERVIEW_RULES_DETAIL.map((v) => {
            return (
              <li key={v.id} className="px-5 text-sm sm:text-lg">
                {v.text}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-row gap-2 w-full">
        <Button
          label={"취소"}
          clickHandler={cancelBtnClickHandler}
          width="50%"
          bgColor="white"
          color="var(--color-blue-950)"
          border="solid 1px var(--color-blue-950)"
        />
        <Button
          label={"면접 시작"}
          clickHandler={startInterviewBtnClickHandler}
          width="50%"
          bgColor="var(--color-blue-950)"
          color="white"
        />
      </div>
    </div>
  );
};

export default InterviewSettingModal;

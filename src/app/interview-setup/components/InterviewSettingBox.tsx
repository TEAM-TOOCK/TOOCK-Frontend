"use client";

import React, { useEffect, useState } from "react";
import {
  INTERVIEW_COMPANY_LIST,
  INTERVIEW_FIELD_CATEGORY,
  INTERVIEW_FIELD_LIST,
  INTERVIEW_SETTING_CONFIG,
  InterviewOptionData,
} from "../constants/interviewSetting.constants";
import Dropdown from "@/app/ui/Dropdown/Dropdown";
import Button from "@/app/ui/Button";
import Play from "@/assets/play.svg";
import { INTERVIEW_RULES } from "../constants/interviewRules.constants";
import { fetchCompanyAndJobList } from "@/app/api/interview/fetchCompanyJobList";
import { useInterviewStore } from "@/stores/interview.store";
import { toast } from "react-toastify";

interface InterviewSetting {
  id: number;
  label: string;
  dataList?: InterviewOptionData[];
  value?: string;
  dataSetter?: (value: string) => void;
}

const InterviewSettingBox = ({ setIsModal }: { setIsModal: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [interviewSettings, setInterviewSettings] = useState<InterviewSetting[]>(INTERVIEW_SETTING_CONFIG);
  // const [companyList, setCompanyList] = useState<string[]>([]);
  // const [fieldList, setFieldList] = useState<string[]>([]);
  // const [jobList, setJobList] = useState<string[]>([]);

  // 전역 상태/액션
  const selectedCompany = useInterviewStore((s) => s.selectedCompany);
  const selectedField = useInterviewStore((s) => s.selectedField);
  const selectedJob = useInterviewStore((s) => s.selectedJob);
  const setSelectedCompany = useInterviewStore((s) => s.setSelectedCompany);
  const setSelectedField = useInterviewStore((s) => s.setSelectedField);
  const setSelectedJob = useInterviewStore((s) => s.setSelectedJob);

  // useEffect(() => {
  //   fetchCompanyAndJobList().then((res) => {
  //     if (res === null) {
  //       setCompanyList([]);
  //       setFieldList([]);
  //       setJobList([]);
  //     } else {
  //       setCompanyList(res.data.company);
  //       setFieldList(res.data.field);
  //       setJobList(res.data.job);
  //     }
  //   });
  // }, []);

  useEffect(() => {
    const updatedSettings = INTERVIEW_SETTING_CONFIG.map((v, _) => {
      switch (v.id) {
        case 0:
          return {
            ...v,
            dataList: INTERVIEW_COMPANY_LIST,
            value: selectedCompany,
            dataSetter: setSelectedCompany,
          };
        case 1:
          return {
            ...v,
            dataList: INTERVIEW_FIELD_CATEGORY,
            value: selectedField as string,
            dataSetter: setSelectedField as React.Dispatch<React.SetStateAction<string>>,
          };
        case 2:
          return { ...v, dataList: INTERVIEW_FIELD_LIST, value: selectedJob, dataSetter: setSelectedJob };
        default:
          return v;
      }
    });
    setInterviewSettings(updatedSettings);
  }, [selectedCompany, selectedField, selectedJob]);

  const clickStartInterviewHandler = () => {
    if (!selectedCompany || !selectedJob) {
      toast.error("기업과 직무를 모두 선택해주세요!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }
    setIsModal(true);
  };
  return (
    <div className="flex flex-col justify-between gap-8 w-full h-auto rounded-md p-5 bg-blue-1 drop-shadow-xl text-blue-950">
      <div className="flex flex-col gap-1">
        <div className="text-xl font-semibold">면접 설정</div>
        <div>
          <div className="text-sm">지원하고자 하는 기업과 직무를 선택해주세요</div>
          <div className="text-sm">선택한 정보를 바탕으로 맞춤형 면접 질문이 생성됩니다</div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {interviewSettings.map((v, _) => {
          return (
            <div key={v.id} className="flex flex-col gap-1  rounded-md">
              <div className="font-semibold">{v.label}</div>
              {interviewSettings && (
                <Dropdown
                  dataList={v.dataList?.map((value) => value.label) ?? []}
                  onChange={v.dataSetter ?? (() => {})}
                  value={v.value ?? ""}
                  bgColor="white"
                />
              )}
            </div>
          );
        })}
      </div>
      <Button
        label={"면접 시작하기"}
        width={"100%"}
        height={"2.5rem"}
        icon={<Play width="0.7rem" height="0.7rem" />}
        bgColor="var(--color-blue-950)"
        color="white"
        clickHandler={clickStartInterviewHandler}
      />
      <div>
        <div>면접 진행 방식</div>
        <ul className="list-disc list-inside">
          {INTERVIEW_RULES.map((v) => {
            return (
              <li key={v.id} className="text-xs">
                {v.text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default InterviewSettingBox;

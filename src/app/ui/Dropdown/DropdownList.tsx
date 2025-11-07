"use client";

import React from "react";
import clsx from "clsx";
import { InterviewOptionData } from "@/app/interview-setup/constants/interviewSetting.constants";

interface Props {
  dataList: InterviewOptionData[];
  selectedItem: InterviewOptionData | undefined;
  setSelectedItem: (value: InterviewOptionData) => void;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownList = ({ dataList, selectedItem, setSelectedItem, setClicked }: Props) => {
  const itemClickHandler = (v: InterviewOptionData) => {
    setSelectedItem(v);
    setClicked(false);
  };
  return (
    <div
      className="
    absolute top-[2.3rem] left-0 
    flex flex-col
    w-full 
    mt-2
    p-1
    border border-b-2
    z-999 
    rounded-md
    bg-white
    "
    >
      {dataList.map((v, idx) => {
        return (
          <div
            key={idx}
            onClick={() => itemClickHandler(v)}
            className={clsx(
              "h-8 px-2 rounded-md w-full truncate text-center leading-8",
              v.value === selectedItem?.value ? "bg-slate-500 text-white" : ""
            )}
          >
            {v.label}
          </div>
        );
      })}
    </div>
  );
};

export default DropdownList;

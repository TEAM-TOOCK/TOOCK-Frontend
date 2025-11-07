"use client";

import React, { useEffect, useRef, useState } from "react";
import DownArrow from "@/assets/down-arrow.svg";
import DropdownList from "./DropdownList";
import { InterviewOptionData } from "@/app/interview-setup/constants/interviewSetting.constants";

interface Props {
  dataList: InterviewOptionData[];
  value: InterviewOptionData | undefined;
  onChange: (value: InterviewOptionData) => void;
  color?: string;
  bgColor?: string;
  border?: string;
}

const Dropdown = ({ dataList, value, onChange, color, bgColor, border }: Props) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setClicked(false);
      }
    };

    if (clicked) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clicked]);

  return (
    <div
      ref={dropdownRef}
      className="relative flex flex-col w-full rounded-md px-1 cursor-pointer"
      style={{ backgroundColor: bgColor, border: border }}
    >
      <div
        onClick={() => {
          setClicked((prev) => !prev);
        }}
        className="flex flex-row items-center justify-between w-full h-[2.5rem] p-2"
      >
        <div className="w-full truncate" style={{ color: color }}>
          {value?.label}
        </div>
        <DownArrow width="0.7rem" height="0.7rem" />
      </div>

      {clicked && (
        <DropdownList selectedItem={value} setSelectedItem={onChange} setClicked={setClicked} dataList={dataList} />
      )}
    </div>
  );
};

export default Dropdown;

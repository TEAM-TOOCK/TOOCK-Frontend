"use client";

import Button from "@/app/ui/Button";
import { useInterviewStore } from "@/stores/interview.store";
import { useRouter } from "next/navigation";
import React from "react";
import { BeatLoader } from "react-spinners";

const TopNav = () => {
  const company = useInterviewStore((s) => s.selectedCompany);
  const field = useInterviewStore((s) => s.selectedField);
  const router = useRouter();

  const exitBtnClickHandler = () => {
    router.push("/dashboard");
  };
  return (
    <div className="flex flex-row justify-between items-center w-full h-15 bg-white px-5 shadow-md">
      <div className="flex flex-row justify-start items-center gap-5">
        <BeatLoader speedMultiplier={0.5} color={"var(--color-blue-950)"} />
        <div className="hidden sm:flex flex-row gap-3">
          <div className="flex justify-center items-center rounded-2xl border-2 px-3 py-1 text-xs">{company.label}</div>
          <div className="flex justify-center items-center rounded-2xl border-2 px-3 py-1 text-xs">{field.label}</div>
        </div>
      </div>
      <Button
        label={"면접 종료"}
        clickHandler={exitBtnClickHandler}
        color="var(--color-blue-950)"
        bgColor="white"
        border={"solid 1px var(--color-blue-950)"}
      />
    </div>
  );
};

export default TopNav;

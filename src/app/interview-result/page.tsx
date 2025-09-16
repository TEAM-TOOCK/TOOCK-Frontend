import React, { Suspense } from "react";
import TopNav from "./components/TopNav";
import InterviewResultContainer from "./components/InterviewResultContainer";
import { MoonLoader } from "react-spinners";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full bg-white">
      <TopNav />
      <Suspense fallback={<MoonLoader color={"var(--color-blue-950)"} />}>
        <InterviewResultContainer />
      </Suspense>
    </div>
  );
};

export default Page;

"use client";

import Button from "../../ui/Button";
import Logo from "@/assets/logo.svg";
import Play from "@/assets/play.svg";
import Logout from "@/assets/logout.svg";
import Google from "@/assets/google.svg";
import { useState, useEffect } from "react";

import { userName } from "../mockData";
import { useRouter } from "next/navigation";

const TopNav = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const clickInterviewHandler = () => {
    router.push("/interview-setup");
  };
  const clickLogoutHandler = () => {
    sessionStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  const clickLoginHandler = () => {};
  return (
    <div className="flex justify-center items-center w-full h-17 shadow-md px-3 sm:px-0 bg-white">
      <div className="flex justify-between items-center sm:w-[70%] w-[100%]">
        <div className="flex flex-row">
          <Logo className="w-16 h-16 text-blue-950" />
          <div className="flex flex-col justify-center">
            <div className="hidden sm:block bg-gradient-to-r text-blue-950 text-lg font-bold">
              AI Interview Service
            </div>
            <div className="hidden sm:block text-sm font-medium text-gray-2">
              지원자 {userName}님, 환영합니다!
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <Button
            label={"면접 시작"}
            icon={<Play width="0.7rem" height="0.7rem" />}
            bgColor="#162456"
            color="white"
            height="2.7rem"
            clickHandler={clickInterviewHandler}
          />
          {isLoggedIn ? (
            <Button
              label={"로그아웃"}
              icon={<Logout width="0.7rem" height="0.7rem" className="text-blue-950" />}
              clickHandler={clickLogoutHandler}
              color="black"
              bgColor="white"
              border="solid 1px #162456"
            />
          ) : (
            <Google onClick={clickLoginHandler} className="cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TopNav;

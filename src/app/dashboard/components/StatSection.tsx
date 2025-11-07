import React from "react";
import { STATS_CONFIG } from "../constants/statsCards.constants";
import StatsCard from "./StatsCard";
import { fetchInterviewStatistics } from "@/app/api/dashboard/fetchDashboardData";
import { useQuery } from "@tanstack/react-query";
import MoonLoader from "react-spinners/MoonLoader";

const StatSection = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["statistics"],
    queryFn: fetchInterviewStatistics,
    enabled: isLoggedIn,
  });

  return (
    <div
      className="
      flex flex-col sm:flex-row gap-5 
      w-[100%]
      "
    >
      {isLoggedIn && isPending ? (
        <div className="flex flex-col w-full justify-center items-center">
          <MoonLoader />
        </div>
      ) : (
        STATS_CONFIG.map((item, index) => {
          return { ...item, data: Object.values(data ?? {})[index] };
        }).map((item, _) => {
          return (
            <StatsCard
              key={item.id}
              title={item.title}
              Icon={item.icon}
              desc={item.desc}
              data={item.data as number}
              bgColor={item.bgColor}
              color={item.color}
            />
          );
        })
      )}
    </div>
  );
};

export default StatSection;

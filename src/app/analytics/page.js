"use client";

import CircularProgress from "@/components/CircularProgress";
import StatisticsTable from "@/components/StatisticsTable";
import api from "@/utils/api";
import { useEffect, useState } from "react";


export default function Dashboard() {
  const [analytics, setAnalytics] = useState({});
  const [progress, setProgress] = useState(0);

  const date = new Date();

  const totalDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  console.log(totalDays)

  const getAnalytics = async() => {
    const req = await api.get("/analytics/get-analytics");
    const res = await req.data;
    console.log(res);
    setAnalytics(res);

    setProgress((res.completedSessions / res.totalSessions)*100)
  }

  useEffect(() => {
    getAnalytics();
  }, [])
  

  return (
    <div>
      <h1 className="text-center my-10 text-3xl font-bold">Analytics</h1>
      <div className="my-10 flex justify-evenly items-center">

        <CircularProgress underlineText={"Sessions Completed"} text={`${analytics.completedSessions}/${analytics.totalSessions}`} value={analytics.completedSessions} max={analytics.totalSessions}/>


        <CircularProgress underlineText={"Overall Progress"} text={`${progress.toFixed(2)}%`} value={progress} max={100}/>

        {/* // 3000 minutes = 50 hours */}
        <CircularProgress text={`${analytics.timeSpend} Mints`} value={analytics.timeSpend} max={3000} underlineText={"Time Spend (50 Hours Max)"}/>



      </div>
        <StatisticsTable days={totalDays}/>
    </div>
  );
}

"use client"

import MyCalendar from "@/components/MyCalendar";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [sessions,setSessions] = useState([]);

  



  return (
    <div>
     <div className="m-5 flex justify-between items-center">
     <h1 className="text-center my-10 font-bold text-4xl">Calendar</h1>
      <Link className="btn btn-sm btn-primary" href={"/calendar/create"}>Study Plan Builder</Link>
     </div>
     
     
     
      <div className="my-10">
      <MyCalendar/>
      </div>
    </div>
  );
}

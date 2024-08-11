"use client"

import api from "@/utils/api";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useFcmToken from "@/hooks/useFcmToken";
export default function Dashboard() {

    const [sessions,setSessions] = useState([]);
    const [startTime,setStartTime] = useState("");
    const [endTime,setEndTime] = useState("");
    const { token, notificationPermissionStatus } = useFcmToken();

    const [theme, setTheme] = useState("no");
    const changeTheme = (theme) => {
      if (theme === "no") return;
      console.log(theme);
      localStorage.setItem("mystudymate-theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }

    const handleTestNotification = async () => {
      console.log(token)
        const response = await fetch("/api/send-notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            title: "Master Theorem",
            message: "Hi, Its time for Master theorem study session.",
            link: "/contact",
          }),
        });
    
        const data = await response.json();
        console.log(data);
      };



    const getSessions = async() => {

        const req = await api.get("/sessions/get-study-sessions");
        const res = await req.data;

        if (res.type == "success") {
            // toast.success("Session updated");
            setSessions(res.sessions[0].sessionTimings);
            console.log(res)
        }
        else {
            toast.error("Something went wrong while getting your sessions");
        }

    }


    const updateSessions = async() => {
        if(sessions.length==0){
            toast.error("Please add start/end date");
            return;
        }
        let newTopics = "";
        sessions.forEach((topic, index)=> {
            newTopics+=`Topic ${index+1}: ${topic.name} - ${topic.difficulty}\n`;
        });
        // const prompt = `This is the outline of the subject that user is currently studying in:
        // ${newTopics}
        // Generate a study schedule for it.
        // `;

        const req = await api.post("/sessions/set-study-sessions", {sessionTimings: sessions});
        const res = await req.data;

        if (res.type == "success") {
            toast.success("Session updated");
        }
        else {
            toast.error("Something went wrong");
        }
    
    }
    const addSession = () => {
        if(startTime=="" || endTime==""){
            toast.error("Please fill all fields");
            return;
        }
        setSessions([...sessions,{startTime,endTime}]);
        setStartTime("");
        setEndTime("");
        toast.success("Session Added");
    }   

    const deleteTopic = (index) => {
        let temp = sessions.filter((topic, i)=> i!=index);
        setSessions(temp);
        toast.success("Session Deleted");
    }
    


    useEffect(() => {
        getSessions();
    }, [])
    

  return (
    <div>
     <h1 className="text-center my-10 font-bold text-4xl">Settings</h1>


     <h1 className="text-center my-10 font-bold text-3xl">Notification Settings</h1> 
     <div className="flex justify-evenly items-center flex-row">

     {notificationPermissionStatus === "granted" ? (
         <p>Permission to receive notifications has been granted.</p>
         ) : notificationPermissionStatus !== null ? (
             <p>
          You have not granted permission to receive notifications. Please
          enable notifications in your browser settings.
        </p>
      ) : null}

      
<button
        disabled={!token}
        className="btn btn-sm btn-primary"
        onClick={handleTestNotification}
      >
        Send Test Notification
      </button>
      </div>

     <div className="divider"></div>
     <h1  className="text-center my-10 font-bold text-3xl">Display Settings</h1>
<div className="flex justify-center items-center">
  
<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Pick your theme</span>
    
  </div>
  <select value={theme} onChange={e=>{
    setTheme(e.target.value);
    changeTheme(e.target.value);
  }} className="select select-bordered">
    <option value={"no"} disabled selected>Pick one</option>
    <option value={"light"}>Light</option>
    <option value={"colorblind"}>Color blind</option>

  </select>

</label>
</div>
     <div className="divider"></div>
     <h1 className="text-center my-10 font-bold text-3xl">Study Session Settings</h1>


     <div className="flex justify-center items-center">
     <input type="time" value={startTime} onChange={(e)=>setStartTime(e.target.value)} placeholder="Start Time" className="input input-bordered w-full max-w-xs" />
     
     <input type="time" value={endTime} onChange={(e)=>setEndTime(e.target.value)} placeholder="End Time" className="mx-5 input input-bordered w-full max-w-xs" />
     

<button className="btn btn-primary" onClick={addSession}>Add Session</button>
     </div>



     <div className="my-10 overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Start Time</th>
        <th>End Time</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>

        

        {
            sessions.map((topic, index)=> {
                return (
                    <tr key={index}>
                    <th>{index+1}</th>
                    <td>{topic.startTime}</td>
                    <td>{topic.endTime}</td>
                    <td><button onClick={()=>{
                        deleteTopic(index);
                    }} className="btn btn-sm btn-primary">Delete</button></td>
                  </tr>
                )
            })
        }
     
     
    </tbody>
  </table>
</div>

{
            sessions.length==0?(
                <p className="my-10 text-center text-3xl">Sessions to add will show here</p>
            ):null
        }


        <div className="flex justify-center items-center">

        <button className="btn btn-primary btn-sm text-center" onClick={updateSessions}>Update Sessions</button>
    
        </div>
    </div>
  );
}

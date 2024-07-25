"use client"

import ScheduleShowcase from "@/components/ScheduleShowcase";
import api from "@/utils/api";
import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast"
export default function Dashboard() {

    const [topics,setTopics] = useState([]);
    const [sessions,setSessions] = useState([]);
    const [name,setName] = useState("");
    const [difficulty,setDifficulty] = useState("Easy");
    const [subject,setSubject] = useState("");
    const [response, setResponse] = useState([]);

    const sampleSessions = [
      {
          "topic": "Recursion tree",
          "difficulty": "Easy",
          "subject": "Design and Analysis of Algorithms",
          "startTime": "10:15",
          "endTime": "10:35"
      },
      {
          "topic": "Asymptotic Notations",
          "difficulty": "Medium",
          "subject": "Design and Analysis of Algorithms",
          "startTime": "10:35",
          "endTime": "11:00"
      },
      {
          "topic": "Tower of Hanoi",
          "difficulty": "Hard",
          "subject": "Design and Analysis of Algorithms",
          "startTime": "11:00",
          "endTime": "11:15"
      }
  ]


    const addToSchedule = async() => {

      console.log("Adding to schedule");

      const req = await api.post("/sessions/add-session-to-calendar", {sessions: response});
      const res = await req.data;

      if (res.type == "success") {
        toast.success(res.message);
      }
      else {
        toast.error(res.message);
      }

    }
    


    const generateSchedule = async() => {
        if(topics.length==0){
            toast.error("Please add topics to generate schedule");
            return;
        }
        let newTopics = "";
        let sessionsToSend =""
        topics.forEach((topic, index)=> {
            newTopics+=`Topic ${index+1}: Name: ${topic.name} - Difficulty: ${topic.difficulty} - Subject: ${topic.subject}\n`;
        });
        sessions.forEach((topic, index)=> {
          sessionsToSend+=`Session ${index+1}: Start time: ${topic.startTime} - End Time: ${topic.endTime}\n`;
        });
        const prompt = `This is the outline of the subject that user is currently studying:
        ${newTopics}
        Generate a study schedule for student to learn each topic , keeping in mind the user's difficulty & user study sessions:
        ${sessionsToSend}
        Give output in json format and don't just give one topic to one slot, give slot to topic keeping in mind its difficulty and user's study sessions.
        Example structure of json: [{
          topic: "topic name",
          difficulty: "difficulty",
          subject: "subject",
          startTime: start time of session,
          endTime: end time of session
        }]
        `;

        const req = await axios.post("/api/generate-schedule", {prompt});
        const res = await req.data;

        console.log(res);
       if (res.type == "success") {
        let jsonString = res.message;
        const cleanedJsonString = jsonString
        .replace(/^```json\s*/, '') // Remove opening triple backticks and optional whitespace
        .replace(/\s*```$/, ''); // Remove closing triple backticks and optional whitespace
      
      // Parse the cleaned JSON string
      const jsonArray = JSON.parse(cleanedJsonString);
      
      // Log the result to verify
      console.log(jsonArray);
        setResponse(jsonArray);

        toast.success("Schedule Generated");
       }
       else {
        toast.error(toast.message);
       }
    
    }
    const addTopic = () => {
        if(name=="" || difficulty=="" || subject == ""){
            toast.error("Please fill all fields");
            return;
        }
        setTopics([...topics,{name,difficulty, subject}]);
        setName("");
        setDifficulty("Easy");
        toast.success("Topic Added");
    }   

    const deleteTopic = (index) => {
        let temp = topics.filter((topic, i)=> i!=index);
        setTopics(temp);
        toast.success("Topic Deleted");
    }
    
    const getStudySessions = async() => {

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
  
  useEffect(() => {
    getStudySessions();
  }, [])
  

  return (
    <>
    
    <div>
     <h1 className="text-center my-10 font-bold text-4xl">Create New Plan</h1>


     <div className="flex justify-center items-center">
     <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Topic Name" className="input input-bordered w-full max-w-xs" />
     <select value={difficulty} onChange={(e)=> {
       setDifficulty(e.target.value);
      }} className="mx-5 select select-bordered w-full max-w-xs">
  <option disabled selected>Your Difficulty</option>
  <option>Easy</option>
  <option>Medium</option>
  <option>Hard</option>
</select>

       <input type="text" value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Subject Name" className="input input-bordered w-full max-w-xs" />
<button className="btn btn-primary" onClick={addTopic}>Add Topic</button>
     </div>





     <div className="my-10 overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Difficulty</th>
        <th>Subjectd</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>

        

        {
            topics.map((topic, index)=> {
                return (
                    <tr key={index}>
                    <th>{index+1}</th>
                    <td>{topic.name}</td>
                    <td>{topic.difficulty}</td>
                    <td>{topic.subject}</td>
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
            topics.length==0?(
                <p className="my-10 text-center text-3xl">Topics to add will show here</p>
            ):null
        }


    
    </div>

    <div className="flex justify-center items-center">
        <button className="btn btn-primary btn-sm text-center" onClick={generateSchedule}>Generate Schedule</button>
    <button className="btn btn-sm btn-neutral mx-2" onClick={()=>document.getElementById('my_modal_1').showModal()}>Open Generated Schedule</button>

      </div>
<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Confirm Your Schedule</h3>
    {
  sampleSessions.map((topic, index)=> {
    return (
      <ScheduleShowcase key={index} subject={topic.subject} title={topic.topic} difficulty={topic.difficulty} startTime={topic.startTime} endTime={topic.endTime}/>
      
      )
    })
  }
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button onClick={addToSchedule} className="btn btn-neutral mx-3">Add to Schedule</button>
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </>
  );
}

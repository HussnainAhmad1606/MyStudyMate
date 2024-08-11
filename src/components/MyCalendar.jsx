"use client"
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import api from '@/utils/api';
import { toast } from 'react-hot-toast';

const MyCalendar = () => {
  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState({});
  const [duration, setDuration] = useState(0)
  const sampleSessions = [
    { title: 'Meeting',message: "meeting 1", start: '2024-07-24T10:00:00', end: '2024-07-24T11:00:00' },
    { title: 'Lunch', message: "meeting 2", start: '2024-07-24T12:00:00', end: '2024-07-24T13:00:00' },
  ];
  const getSessions = async() => {
    const req = await api.get("/sessions/get-sessions");
    const res = await req.data;
    console.log(res);
    setSessions(res.sessions);
  }

  useEffect(() => {
    getSessions();
  }, [])


  const markAsDone = async() => {
    try {
      const req = await api.post("/sessions/mark-done-session", {
        sessionId: session?._def?.extendedProps?._id,
        duration: duration
      });
      const res = await req.data;
      console.log(res);
      if (res.type === "success") {
        toast.success(res.message);
        getSessions();
      }
      else {
        toast.error(res.message);
  
      }
    }
    catch(error) {
      console.log(error)
    }
    
  }
  
  const handleDateClick = (arg) => {
    console.log(arg)
  };
  const eventClick = (arg) => {
    console.log(arg);
    setSession(arg.event);
    const startDate = new Date(arg.event?._instance?.range?.start);
    const endDate = new Date(arg.event?._instance?.range?.end);
  
    // Calculate the difference in milliseconds
    const diffInMs = endDate - startDate;
  
    console.log(startDate)
    // Convert the difference to more useful units
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    setDuration(diffInMinutes);
    document.getElementById('my_modal_1').showModal();
  };

  return (
    <>
    <FullCalendar
    viewClassNames={"m-10"}
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    initialView="dayGridMonth"
    dateClick={handleDateClick}
    eventClick={eventClick}
    events={ sessions}
    />
    {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_1" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Session Details:</h3>
    <p className="py-4">Topic: {session?._def?.title}</p>
    <p className="py-4">Status: {session?._def?.extendedProps?.status}</p>
    <p className="py-4">Subject: {session?._def?.extendedProps?.subject}</p>
    <p className="py-4">Duration: {duration} Minutes</p>
    <p className="py-4">Start: {new Date(session?._instance?.range?.start).toLocaleString()}</p>
    <p className="py-4">End: {new Date(session?._instance?.range?.end).toLocaleString()}</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button onClick={markAsDone} className="mx-3 btn-neutral btn">Mark as done</button>
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </>
  );
};

export default MyCalendar;

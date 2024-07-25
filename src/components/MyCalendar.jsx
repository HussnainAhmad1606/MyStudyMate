"use client"
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import api from '@/utils/api';

const MyCalendar = () => {
  const [sessions, setSessions] = useState([]);
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
  
  const handleDateClick = (arg) => {
    console.log(arg)
  };
  const eventClick = (arg) => {
    console.log(arg)
  };

  return (
    <FullCalendar
    viewClassNames={"m-10"}
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      dateClick={handleDateClick}
      eventClick={eventClick}
      events={ sessions}
    />
  );
};

export default MyCalendar;

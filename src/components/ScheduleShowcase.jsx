import React from 'react'

function ScheduleShowcase({subject, title, startTime, endTime, difficulty}) {
  return (
    <div className="m-10 card bg-base-100 w-96 shadow-xl">

  <div className="card-body">
    <h2 className="card-title">{title}</h2>
    <p>Start Time: {startTime}</p>
    <p>End Time: {endTime}</p>
    <p>Difficulty: {difficulty}</p>
    <p>Subject: {subject}</p>
    
  </div>
</div>
  )
}

export default ScheduleShowcase
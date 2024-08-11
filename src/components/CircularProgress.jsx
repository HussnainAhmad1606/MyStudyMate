import React from 'react'
import { CircularProgressbar, buildStyles  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
function CircularProgress({underlineText, text, value, max}) {

  return (
    <div className='flex justify-center items-center flex-col' style={{ width: 200, height: 400 }}>
    <CircularProgressbar maxValue={max} styles={buildStyles({


// Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'


// Text size
textSize: '16px',

// How long animation takes to go from one percentage to another, in seconds
pathTransitionDuration: 0.5,

// Can specify path transition in more detail, or remove it entirely
// pathTransition: 'none',

// Colors
pathColor: `#FF7F50`,
textColor: '#000',
fontWeight: 'bold',
trailColor: '#000',
backgroundColor: '#000',
})} value={value} text={text} />

<h1 className='text-center my-5 text-2xl font-bold'>{underlineText}</h1>
  </div>
  )
}

export default CircularProgress
import React from 'react'
import "@/css/StatisticsTable.css";

const getDaysInCurrentMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-11, so add 1
    return new Date(year, month, 0).getDate();
  };

const createContributionLevels = () => {
    // Generate a random level between 0 and 4 for demonstration purposes
    return Math.floor(Math.random() * 5);
  };
  

const ContributionGrid = () => {
  const daysInMonth = getDaysInCurrentMonth();
  const currentDate = new Date().getDate();
  console.log(`Curent Date: ${currentDate}`)
  const boxes = [];

  for (let i = 1; i < daysInMonth+1; i++) {
    const level = createContributionLevels();
    if (i == currentDate) {
      boxes.push(<div key={i} className={`box level-${level} active`}></div>);
      continue;
    }
    boxes.push(<div key={i} className={`box level-${level}`}></div>);
  }

  return <div className="container">{boxes}</div>;
};


function StatisticsTable({days}) {
    
      
 
    return (
        <>
        <h1 className='text-center font-bold text-3xl my-5'>Study Graph</h1>
        <div className="App">
         <ContributionGrid />
        </div>
        </>
      );
  
}

export default StatisticsTable
// components/LineChart.js
import React, {useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import api from '@/utils/api';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineController, LineElement, PointElement, LinearScale, TimeScale);

const StudyGraph = () => {
  const [Data, setData] = useState([]);

  const getMonthlyData = async() => {
    const req = await api.post('/sessions/get-graph-sessions')

    const result = req.data;
    console.log(result)
    setData(result.data)
  }
  const getCurrentMonthRange = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { startOfMonth, endOfMonth };
  };

  useEffect(() => {
    getMonthlyData();
  }, [])
  

  const { startOfMonth, endOfMonth } = getCurrentMonthRange();
  const data = {
    datasets: [
      {
        label: 'Monthly Sessions',
        data:
        Data,
      //   [
      //    { x: '2024-08-01', y: 5 },
      //    { x: '2024-08-02', y: 7 },
      //    { x: '2024-08-04', y: 4 },
      //   { x: '2024-08-15', y: 8 },
      //  { x: '2024-08-18', y: 6 },
      //    { x: '2024-08-20', y: 9 }
      //   //  Add more data points here
      //   ],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: '#fff',
        pointRadius: 5,
        fill: false, // Do not fill the area under the line
        tension: 0.1 // Smooth the lines
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Date: ${tooltipItem.raw.x}, Sessions: ${tooltipItem.raw.y}`
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM d',
          displayFormats: {
            day: 'MMM d'
          }
        },
        min: startOfMonth.toISOString(),
        max: endOfMonth.toISOString(),
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        min: 1,
        max: 10,
        title: {
          display: true,
          text: 'Sessions'
        }
      }
    }
  };

  return (
    <div>
      <h2 className='text-center text-3xl font-bold my-10'>Monthly Statistics</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default StudyGraph;

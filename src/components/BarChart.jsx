import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

//  const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: [1,2,3,4],
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     }

//   ],
// };



const BarChart = ({ skills }) => {


  // const [myskills, setSkills] = useState([skills])

  let skillNamesArray = []
  let skillScoresArray = []

  // for (var item of myskills) {

  //   for (var i of item) {
  //     skillNamesArray.push(i.skillName)
  //     skillScoresArray.push(i.skillScore)
  //   }
  // }


  for (let item of skills) {
    skillNamesArray.push(item.skillName);
    skillScoresArray.push(item.skillScore);
  }


  const labels = [...skillNamesArray];

  const data = {
    labels,
    datasets: [
      {
        label: 'Tech Stack Skill Score',
        data: [...skillScoresArray],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },

    ],
    options: {
      plugins: {
        legend: {
          maintainAspectRatio: true,
          display: true,
          labels: {
            color: '#fff'
          }
        }
      }
    }


  }




  return (
    <div>
      {/* <h1 className="text-center text-lg px-2 py-2">My Technological Skills</h1> */}
      <div style={{ width: '100%', height: 'auto' }
      }>
        <Bar data={data} />
      </div >
    </div >
  )
}

export default BarChart

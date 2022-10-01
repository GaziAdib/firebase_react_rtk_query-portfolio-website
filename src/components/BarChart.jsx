import React, {useState} from 'react';
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



const BarChart = ({skills}) => {


    const [myskills, setSkills] = useState([skills])

    console.log(myskills)


    let skillNamesArray = []
    let skillScoresArray = []

    for(var item of myskills) {
        console.log(item)
        
        for(var i of item) {
            skillNamesArray.push(i.skillName)
            skillScoresArray.push(i.skillScore)
        }
    }

    console.log(skillNamesArray)

    const labels = [...skillNamesArray];

    const data = {
    labels,
    datasets: [
        {
        label: 'Skill Score',
        data: [...skillScoresArray],
        backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
          ],
        },
        

    ],
    };



    return (
        <div>
            <h1>SKILL BAR CHART</h1>
            <div style={{ width: '80%', height:'600px', margin: '0 auto' }}>
                <Bar data={data}/>
            </div>
        </div>
    )
}

export default BarChart

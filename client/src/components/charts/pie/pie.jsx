import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



export function PieChart({title, labels, dataset}) {
  
    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: title,
          },
        },
    };

    const data = {
        labels,
        datasets: [
          {
            label: title,
            data: dataset,
            backgroundColor: [
              '#FE0000',
              '#FE54FF',
              '#019501',
              '#FCFE55',
              '#8A9597',
              '#8C8DF9',
              '#56BBFF',
            ],
            borderColor: [
              '#FE0000',
              '#FE54FF',
              '#019501',
              '#FCFE55',
              '#8A9597',
              '#8C8DF9',
              '#56BBFF',
            ],
            borderWidth: 1,
          },
        ],
      };

  return <Pie options={options} data={data} />;
}
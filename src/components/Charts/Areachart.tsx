import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  elements: {
    line: {
      tension: 0.4
    },
    point: {
      radius: 3
    }
  },
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Propostas da semana'
    }
  },
  scales: {
    x: {
      grid: {
        display: true
      }
    },
    y: {
      grid: {
        display: true
      }
    }
  }
};

const labels = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
  'Domingo',
];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Aprovadas',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)'
    },
    {
      fill: true,
      label: 'Reprovadas',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: 'rgba(128, 0, 0, 1)',
      backgroundColor: 'rgba(130, 0, 0, 0.6)'
    }
  ]
};

export function Areachart() {
  return <Line options={options} data={data} />;
}

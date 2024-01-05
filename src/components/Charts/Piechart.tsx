import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Piechart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const
      },
      title: {
        display: true,
        text: 'Status das propostas'
      }
    }
  };
  const labels = ['Aprovadas', 'Reprovadas', 'Não acatadas', 'Pendente', 'Analise'
  , 'Captura Bio e Documentos'
  , 'Aguardando Retorno do FGTS'
  , 'Envio para Reserva FGTS'
];

  const data = {
    labels,
    datasets: [
      {
        label: 'Status das propostas',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(13, 102, 255, 1)',
          'rgba(25, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(13, 102, 255, 0.2)',
          'rgba(55, 159, 64, 0.2)'
        ],
        borderWidth: 1
      }
    ]
  };
  return <Pie options={options} data={data} />;
}

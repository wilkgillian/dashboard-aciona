import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Dashboard } from '@/contexts/DashboardContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarchartProps {
  dashboard: Dashboard;
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Tipos de pagamento'
    }
  },
  barThickness: 15,
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      grid: {
        display: false
      }
    }
  }
};

export default function Barchart({ dashboard }: BarchartProps) {
  const data = {
    labels: dashboard.data.tipoPagamento.map(item => item.pagamento),
    datasets: [
      {
        label: 'Quantidade',
        data: dashboard.data.tipoPagamento.map(item => item.quantidade),
        backgroundColor: '#0078D1'
      }
    ]
  };
  return <Bar options={options} data={data} />;
}

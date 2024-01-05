import { Dashboard } from '@/contexts/DashboardContext';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutchartProps {
  dashboard: Dashboard;
}

export const options: ChartOptions<'doughnut'> = {
  plugins: {
    legend: {
      position: 'right'
    },
    title: {
      display: true,
      text: 'Dos clientes acionados'
    }
  }
};

export function Doughnutchart({ dashboard }: DoughnutchartProps) {
  const data = {
    labels: [
      `${dashboard.data.producao.percRecado.toFixed(2)}% Recados`,
      `${dashboard.data.producao.percInsucesso.toFixed(2)}% Insucessos`,
      `${dashboard.data.producao.percAcordos.toFixed(2)}% Acordos`
    ],
    datasets: [
      {
        label: 'Quantidade',
        data: [
          dashboard.data.producao.recado,
          dashboard.data.producao.insucesso,
          dashboard.data.producao.acordos
        ],
        backgroundColor: ['#F4C261', '#88F7C8', '#F46173'],
        borderWidth: 1
      }
    ]
  };
  return <Doughnut options={options} data={data} />;
}

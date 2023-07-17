import { TProduct } from '@/configs/types/product';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
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
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Number of items per product',
    },
  },
};

type ProductChartProps = {
  products: TProduct[];
};

const ProductChart = ({ products }: ProductChartProps) => {
  const labels = products.map((product) => product.title);
  const data = {
    labels,
    datasets: [
      {
        label: 'Product stock',
        data: products.map((product) => product.stock),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default ProductChart;

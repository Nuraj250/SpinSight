import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const FrequencyChart = ({ history }) => {
  const counts = Array(37).fill(0);
  history.forEach((h) => counts[h.pocket]++);

  const data = {
    labels: [...Array(37).keys()],
    datasets: [
      {
        label: 'Frequency',
        data: counts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="card mt-4 p-3">
      <h5>📊 Frequency Chart</h5>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FrequencyChart;

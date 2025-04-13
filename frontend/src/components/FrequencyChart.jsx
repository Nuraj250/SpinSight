import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale);

const FrequencyChart = ({ history }) => {
  const freqMap = {};
  history.forEach((item) => {
    const n = item.pocket;
    freqMap[n] = (freqMap[n] || 0) + 1;
  });

  const sortedKeys = Object.keys(freqMap).sort((a, b) => freqMap[b] - freqMap[a]);

  const data = {
    labels: sortedKeys,
    datasets: [
      {
        label: 'Frequency',
        data: sortedKeys.map((k) => freqMap[k]),
        backgroundColor: 'rgba(255,99,132,0.6)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <div style={{ width: 500, margin: '30px auto' }}>
      <h3>📊 Number Frequency</h3>
      <Bar data={data} options={options} />
    </div>
  );
};

export default FrequencyChart;

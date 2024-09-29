// QuarterlyRevenueChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Đăng ký các thành phần ChartJS
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const QuarterlyRevenueChart = ({ quarterData, currentYear }) => {
  const data = {
    labels: ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4'],
    datasets: [
      {
        label: `Doanh thu năm ${currentYear}`,
        data: quarterData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Bar 
      data={data} 
      options={options} 
      style={{ height: '450px' }} // Thiết lập chiều cao cố định
    />
  );
};

export default QuarterlyRevenueChart;

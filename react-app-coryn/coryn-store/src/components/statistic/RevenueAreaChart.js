// RevenueAreaChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler,
  PointElement // Thêm PointElement vào đây
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, Filler, PointElement); // Đăng ký PointElement

const RevenueAreaChart = ({ revenueDataThree }) => {
  const years = Object.keys(revenueDataThree);
  const quarters = ['1', '2', '3', '4'];

  // Tạo labels cho biểu đồ
  const labels = years.flatMap(year => quarters.map(quarter => `Q${quarter} ${year}`));

  // Tạo dữ liệu cho biểu đồ
  const data = {
    labels,
    datasets: [
      {
        label: 'Tổng Doanh Thu',
        data: years.flatMap(year => quarters.map(quarter => revenueDataThree[year][quarter] || 0)),
        backgroundColor: 'rgba(75, 192, 192, 0.4)', // Màu nền cho diện tích
        borderColor: 'rgba(75, 192, 192, 1)', // Màu đường
        borderWidth: 2,
        fill: true, // Tô màu diện tích
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Doanh thu',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Quý',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default RevenueAreaChart;

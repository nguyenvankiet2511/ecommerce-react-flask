// CategoryRevenueChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Đăng ký các thành phần ChartJS
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const CategoryRevenueChart = ({ revenueData }) => {
  // Tạo dữ liệu cho biểu đồ
  const data = {
    labels: revenueData.map(item => item.category_name),
    datasets: [
      {
        label: 'Doanh thu theo danh mục',
        data: revenueData.map(item => item.doanh_thu),
        backgroundColor: revenueData.map(() => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`),
        borderColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return <Pie data={data} options={options} style={{ height: '450px' }} />;
};

export default CategoryRevenueChart;

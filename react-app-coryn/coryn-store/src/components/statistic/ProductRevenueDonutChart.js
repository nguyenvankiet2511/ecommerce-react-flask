// ProductRevenueHorizontalBarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const ProductRevenueHorizontalBarChart = ({ revenueProduct }) => {
  const labels = revenueProduct.map(item => item.product_name);
  const data = {
    labels,
    datasets: [
      {
        label: 'Doanh thu',
        data: revenueProduct.map(item => item.doanh_thu),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // Sử dụng trục y cho các cột
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Doanh thu (VND)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sản phẩm',
        },
      },
    },
  };

  return <Bar data={data} options={options}  />;
};

export default ProductRevenueHorizontalBarChart;

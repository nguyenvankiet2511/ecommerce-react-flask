import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Đăng ký các thành phần của ChartJS
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const YearlyRevenueLineChart = ({ data }) => {
  // Lấy các năm từ data
  const years = Object.keys(data);
  const revenueData = years.map(year => data[year]);

  // Tạo dữ liệu cho hai datasets
  const dataset1 = revenueData.map(revenue => revenue * 0.8); // Dữ liệu cho dataset 1
  const dataset2 = revenueData.map(revenue => revenue * 1.2); // Dữ liệu cho dataset 2

  const chartData = {
    labels: years, // Sử dụng danh sách các năm
    datasets: [
      {
        label: 'Khách hàng mới (Dataset 1)', // Nhãn của dataset 1
        data: dataset1, // Dữ liệu cho dataset 1
        borderColor: 'rgba(54, 162, 235, 1)', // Màu đường kẻ (line) cho dataset 1
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Màu nền dưới đường kẻ cho dataset 1
        fill: true, // Đổ màu nền dưới đường kẻ
        tension: 0.4, // Độ cong của đường kẻ
        pointBorderColor: 'rgba(54, 162, 235, 1)', // Màu của điểm
        pointBackgroundColor: '#fff', // Màu nền của điểm
        pointRadius: 5, // Kích thước của điểm
      },
      {
        label: 'Khách hàng mới (Dataset 2)', // Nhãn của dataset 2
        data: dataset2, // Dữ liệu cho dataset 2
        borderColor: 'rgba(255, 99, 132, 1)', // Màu đường kẻ (line) cho dataset 2
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Màu nền dưới đường kẻ cho dataset 2
        fill: true, // Đổ màu nền dưới đường kẻ
        tension: 0.4, // Độ cong của đường kẻ
        pointBorderColor: 'rgba(255, 99, 132, 1)', // Màu của điểm
        pointBackgroundColor: '#fff', // Màu nền của điểm
        pointRadius: 5, // Kích thước của điểm
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
    plugins: {
      legend: {
        display: true, // Hiển thị legend
        position: 'top', // Vị trí legend
      },
    },
  };

  return (
    <div>
     
      <Line 
        data={chartData} 
        options={options} 
        style={{ height: '450px' }} // Thiết lập chiều cao cố định
      />
      <div style={{ marginTop: '20px', fontSize: '16px' }}>
        <p>Số lượng hàng tồn kho: 500</p>
        <p style={{ color: 'red' }}>⚠️ Tồn kho thấp</p>
      </div>
    </div>
  );
};

export default YearlyRevenueLineChart;

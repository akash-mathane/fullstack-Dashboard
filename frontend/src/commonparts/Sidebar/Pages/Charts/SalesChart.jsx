import React, { useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

const SalesChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Fetch data from your Flask backend
    fetch('http://127.0.0.1:5000/api/sales')
      .then((response) => response.json())
      .then((data) => {
        setSalesData(data);
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
      });
  }, []);

  const chartData = {
    labels: salesData.map((item) => item.month),
    datasets: [
      {
        label: 'Total Sales',
        data: salesData.map((item) => item.total_sales),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Set the X-axis scale type to 'category'
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Sales Analysis</h2>
      <Line data={chartData} options={chartOptions} width={400} height={200} />
    </div>
  );
};

export default SalesChart;

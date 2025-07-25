import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BarChartCard = ({ heading, labels, data, colors }) => {
  // Dynamically calculate chart height based on number of bars (e.g., 30px per item)
  const chartHeight = labels.length * 36 + "px";

  return (
    <div
      className="
        p-4 sm:p-6
        transition transform duration-300 hover:scale-[1.02]
        rounded-2xl shadow-sm hover:shadow-lg
        border border-transparent 
        hover:border-lime-300 hover:border-t-yellow-300 hover:border-r-green-300 hover:border-b-amber-300
        hover:ring-2 hover:ring-lime-200/50 
        bg-white overflow-hidden w-full
        "
     >
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold text-gray-800">{heading}</div>
      </div>
      <div style={{ height: chartHeight, position: 'relative', width: '100%' }}>
        <Bar 
          data={{
            labels: labels,
            datasets: [{
              label: heading,
              data: data,
              backgroundColor: colors,
              borderRadius: 8,
            }],
          }} 
          options={{
            indexAxis: 'y', // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false }
            },
            scales: {
              x: { grid: { display: false }},
              y: { grid: { color: "#f0f0f0" }}
            }
          }}
        />
      </div>
    </div>
  );
};

export default BarChartCard;
// © 2025 Chinmayee C J. All rights reserved.


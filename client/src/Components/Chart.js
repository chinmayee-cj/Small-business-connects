import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const ChartCard = ({ heading, fields }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const current = new Date();
  const date = current.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const COLORS = ["#D9F99D", "#FEF08A", "#BBF7D0", "#FDE68A"];

  const pieData = {
    labels: fields.map((field) => field.name),
    datasets: [
      {
        data: fields.map((field) => field.value),
        backgroundColor: COLORS,
        hoverBackgroundColor: COLORS,
      },
    ],
  };

  const barColors = ["bg-lime-200", "bg-yellow-200", "bg-green-200", "bg-amber-200"];

  return (
    <div className="w-full sm:w-1/2 p-2">
      <div
        className="
          p-4 sm:p-6
          transition transform duration-300 hover:scale-[1.02]
          rounded-2xl shadow-sm hover:shadow-lg
          border border-transparent
          hover:border-lime-300 hover:border-t-yellow-300 hover:border-r-green-300 hover:border-b-amber-300
          hover:ring-2 hover:ring-lime-200/50
          bg-white overflow-hidden
        "
        >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-xl font-semibold text-gray-800">{heading}</div>
          <div className="text-sm text-gray-500">
            {date} • {currentTime}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="w-full flex justify-center mb-4">
          <Pie data={pieData} />
        </div>

        {/* Legend + Bars */}
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{field.name}</span>
                <span>{field.value}</span>
              </div>
              <div
                className={`h-2 rounded-full mt-1 ${
                  barColors[index % barColors.length]
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;
// © 2025 Chinmayee C J. All rights reserved.


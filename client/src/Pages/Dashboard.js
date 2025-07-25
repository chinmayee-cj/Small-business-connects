import React, { useState, useEffect } from "react";
import Menubar from "../Components/Menubar";
import MenuToggle from "../Components/MenuToggle";
import Navbar from "../Components/Navbar";
import Card from "../Components/Dashboard-card";
import { reedem, service, users, revenue } from "../Assets/index";
import ChartComponent from "../Components/Chart";
import BarChartCard from "../Components/BarChartCard";
import { Line } from "react-chartjs-2";

import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Filler, Legend, Tooltip } from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,      // <-- Register the Filler plugin
  Legend,
  Tooltip
);

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    async function fetchData() {
      const res = await fetch(`/api/analysis-data?userId=${userId}`);
      if (res.ok) {
        const records = await res.json();
        setAnalytics(records);
      }
    }
    fetchData();
  }, []);

  // Group data by date
  const byDate = {};
  analytics.forEach(record => {
    const day = record.date ? record.date.slice(0, 10) : "";
    if (!byDate[day]) byDate[day] = {
      usersReached: 0, revenue: 0, bookings: 0, cancellations: 0,
      totalActivity: 0, cost: 0, profit: 0
    };
    byDate[day].usersReached += record.usersReached || 0;
    byDate[day].revenue += record.revenue || 0;
    byDate[day].bookings += record.bookings || 0;
    byDate[day].cancellations += record.cancellations || 0;
    byDate[day].totalActivity += record.totalActivity || 0;
    byDate[day].cost += record.cost || 0;
    byDate[day].profit += record.profit || 0;
  });

  // Prepare data for charts
  const chartLabels = Object.keys(byDate).sort((a, b) => new Date(a) - new Date(b));
  const last15Labels = chartLabels.slice(-15); // last (latest) 15 days
  const last15Bookings = last15Labels.map(day => byDate[day].bookings);
  const usersTrend = chartLabels.map(day => byDate[day].usersReached);
  const bookingsTrend = chartLabels.map(day => byDate[day].bookings);
  const revenueTrend = chartLabels.map(day => byDate[day].revenue);

  // Today's stats
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayEntry = byDate[todayStr] || {};

  // Last available entry as fallback
  const latestEntry =
    byDate[chartLabels[chartLabels.length - 1]] || {};

  const display = Object.keys(todayEntry).length
    ? todayEntry
    : latestEntry;

  // Summary totals
  const totalRevenue = analytics.reduce((sum, a) => sum + (a.revenue || 0), 0);
  const totalUsers = analytics.reduce((sum, a) => sum + (a.usersReached || 0), 0);
  const totalBookings = analytics.reduce((sum, a) => sum + (a.bookings || 0), 0);
  const totalProfit = analytics.reduce((sum, a) => sum + (a.profit || 0), 0);

  // Group by month for trends
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
                      "Aug", "Sep", "Oct", "Nov", "Dec"];
  const byMonth = {};
  analytics.forEach(record => {
    if (!record.date) return;
    const dt = new Date(record.date);
    const key = `${monthNames[dt.getMonth()]} ${dt.getFullYear()}`;
    if (!byMonth[key]) byMonth[key] = { users: 0, revenue: 0 };
    byMonth[key].users += record.usersReached || 0;
    byMonth[key].revenue += record.revenue || 0;
  });

  const monthlyLabels = Object.keys(byMonth);
  const monthlyUsers = monthlyLabels.map(month => byMonth[month].users);
  const monthlyRevenue = monthlyLabels.map(month => byMonth[month].revenue);

  // Chart data
  const lineData = {
    labels: monthlyLabels,
    datasets: [
      {
        label: "Monthly Users",
        data: monthlyUsers,
        fill: true,
        backgroundColor: "rgba(250, 240, 138, 0.3)",
        borderColor: "#a3e635",
        borderWidth: 3,
        pointBorderColor: "#a3e635",
        pointBackgroundColor: "#bbf7d0",
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
      },
      {
        label: "Monthly Revenue",
        data: monthlyRevenue,
        fill: false,
        borderColor: "#38bdf8",
        borderWidth: 2,
        pointBorderColor: "#38bdf8",
        pointBackgroundColor: "#f0f9ff",
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.4,
        type: "line"
      }
    ]
  };

  const lineChartOptions = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#374151",
          font: { size: 16, family: "Inter, sans-serif" },
          boxWidth: 18,
          padding: 16,
        }
      }
    },
    scales: {
      x: {
        grid: { color: "#f0fdf4" },
        ticks: { color: "#64748b", font: { family: "Inter, sans-serif" } }
      },
      y: {
        grid: { color: "#f0fdf4" },
        ticks: { color: "#64748b", font: { family: "Inter, sans-serif" } }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleMenuToggle = () => setShowMenu(!showMenu);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <Menubar/>
        <div className="flex-1 sm:relative bg-lime-50 ml-64">
          <div className="h-20 bg-white shadow-md">
            <Navbar pagename={"Dashboard"} />
          </div>
          <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
          <div className="flex flex-wrap justify-between mt-10 mx-4 sm:justify-start">
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
              <Card
                title={totalRevenue.toLocaleString()}
                subtitle={"Total revenue"}
                icon={revenue}
                color={"bg-gradient-to-r from-yellow-100 via-lime-200 to-emerald-300"}
              />
            </div>
            <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-2 mb-4">
              <Card
                title={"1.5K"}
                subtitle={"Reward Points redeemed"}
                icon={reedem}
                color={"bg-gradient-to-r from-yellow-100 via-lime-200 to-emerald-300"}
              />
            </div>
            <div className="w-full lg:w-1/4 px-2 mb-4">
              <Card
                title={totalBookings.toLocaleString()}
                subtitle={"Total Bookings"}
                icon={service}
                color={"bg-gradient-to-r from-yellow-100 via-lime-200 to-emerald-300"}
              />
            </div>
            <div className="w-full lg:w-1/4 px-2 mb-4">
              <Card
                title={totalUsers.toLocaleString()}
                subtitle={"Total Users Reached"}
                icon={users}
                color={"bg-gradient-to-r from-yellow-100 via-lime-200 to-emerald-300"}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-between w-full px-2 mb-4">
              <ChartComponent
                heading="Your Business Stats"
                fields={[
                  { name: "Users reached", value: display.usersReached || 0 },
                  { name: "Revenue generated", value: display.revenue || 0 },
                  { name: "Bookings", value: display.bookings || 0 },
                  { name: "Cancellations", value: display.cancellations || 0 },
                  { name: "Total Activity", value: display.totalActivity || 0 },
                  { name: "Cost", value: display.cost || 0 },
                  { name: "Profit", value: display.profit || 0 },
                ]}
              />
              <BarChartCard
                heading="Total Bookings Trend"
                labels={last15Labels}
                data={last15Bookings}
                colors={["#BBF7D0", "#FEF08A", "#D9F99D", "#FDE68A"]}
              />
            </div>
          </div>
          <div className="w-full flex justify-center pb-10">
            <div className="
              w-full max-w-3xl
              mt-8
              px-4 py-6 pb-10
              transition transform duration-300 hover:scale-[1.02]
              rounded-2xl shadow-sm hover:shadow-lg
              border border-[#D1E7DD]
              bg-white
              overflow-hidden
            ">
              <div className="text-xl font-semibold text-gray-800 mb-4">
                Monthly Usage & Revenue Trends
              </div>
              <div style={{ height: "380px" }}>
                <Line data={lineData} options={lineChartOptions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// © 2025 Chinmayee C J. All rights reserved.

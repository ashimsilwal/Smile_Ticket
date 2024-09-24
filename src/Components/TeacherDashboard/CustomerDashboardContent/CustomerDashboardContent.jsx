import React from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import "./DashboardContent.css";
import { FaBus, FaUserPlus, FaMoneyBillWave } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const CustomerDashboardContent = () => {
  const packageChartData = {
    labels: ["1 Month", "3 Months", "6 Months"],
    datasets: [
      {
        label: "Package Sales",
        data: [150, 80, 30], // Replace with actual data
        backgroundColor: ["#28a745", "#dc3545", "#626ee3"],
        hoverOffset: 4,
      },
    ],
  };

  const salesChartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"], // Adjust based on your data
    datasets: [
      {
        label: "Ticket Sales",
        data: [2500, 3200, 2800, 3500], // Replace with actual data
        backgroundColor: "#2b60ec",
      },
    ],
  };

  return (
    <div className="dashboard-content">
      <h2>Customer Bus Ticket System Dashboard</h2>

      <div className="data-summary">
        <div className="summary-card">
          <div className="icon blue-icon">
            <FaUserPlus />
          </div>
          <div className="data">
            <h4>Total Registered Users</h4>
            <p>1200</p> {/* Replace with actual data */}
          </div>
        </div>

        <div className="summary-card">
          <div className="icon green-icon">
            <FaBus />
          </div>
          <div className="data">
            <h4>Total Tickets Sold</h4>
            <p>10,000</p> {/* Replace with actual data */}
          </div>
        </div>

        <div className="summary-card">
          <div className="icon purple-icon">
            <FaMoneyBillWave />
          </div>
          <div className="data">
            <h4>Total Revenue</h4>
            <p>$50,000</p> {/* Replace with actual data */}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default CustomerDashboardContent;

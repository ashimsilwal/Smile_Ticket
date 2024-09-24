import React, { useEffect, useState } from "react";
// import { Line, Bar, Pie } from 'react-chartjs-2';
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
import { CloudCog } from "lucide-react";
import axios from "axios";

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

const DashboardContent = () => {
  const [count, setCount] = useState();
  const [renserApp, setRendder] = useState(false);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/getCount");
      // console.log(response.data);
      setCount(response.data.data.results_count);
      setRendder(true)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => loadData(), []);

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
            <p>{renserApp ? count : "loading..."}</p>{" "}
            {/* Replace with actual data */}
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

export default DashboardContent;

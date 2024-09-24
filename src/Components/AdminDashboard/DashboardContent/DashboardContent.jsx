import React, { useEffect, useState } from "react";
// import { Line, Bar, Pie } from 'react-chartjs-2';

import "./DashboardContent.css";
import { FaBus, FaUserPlus, FaMoneyBillWave } from "react-icons/fa";
import { CloudCog } from "lucide-react";
import axios from "axios";

const DashboardContent = () => {
  const [count, setCount] = useState(); // Initialize count with 0
  const [renderApp, setRender] = useState(false); // Corrected variable names

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/getCount");
      // console.log(response.data);
      setCount(response.data.data); 
      setRender(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="dashboard-content">
  
      <h2> Dashboard</h2>

      <div className="data-summary">
        <div className="summary-card">
          <div className="icon blue-icon">
            <FaUserPlus />
          </div>
          <div className="data">
            <h4>Total Registered Users</h4>
            <p>{renderApp ? <div>{count.results_count}</div> : <div>Loading...</div>}</p>
            {/* Replace with actual data */}
          </div>
        </div>

        <div className="summary-card">
          <div className="icon green-icon">
            <FaBus />
          </div>
          <div className="data">
            <h4>Total Tickets Sold</h4>
            <p>{renderApp ? <div>{count.ticket_count}</div> : <div>Loading...</div>}</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="icon purple-icon">
            <FaMoneyBillWave />
          </div>
          <div className="data ">
            <h4>Total Transaction</h4>
            <p>{renderApp ? <div>Rs. {count.ticket_amount}</div> : <div>Loading...</div>}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;

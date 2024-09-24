import React, { useEffect, useState } from "react";

import "./DashboardContent.css";
import { FaBus, FaUserPlus, FaMoneyBillWave } from "react-icons/fa";
import axios from "axios";



const CustomerDashboardContent = () => {


  const [count, setCount] = useState(); // Initialize count with 0
  const [renderApp, setRender] = useState(false); // Corrected variable names
  var token = localStorage.getItem("token");


  const loadData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/getCountById/${token}`);
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
      <h2>Customer Bus Ticket System Dashboard</h2>

      <div className="data-summary">
       

        <div className="summary-card">
          <div className="icon green-icon">
            <FaBus />
          </div>
          <div className="data">
            <h4>Total Tickets Bought</h4>
            <p>{renderApp ? <div>{count.ticket_count}</div> : <div>Loading...</div>}</p> {/* Replace with actual data */}
          </div>
        </div>

        <div className="summary-card">
          <div className="icon purple-icon">
            <FaMoneyBillWave />
          </div>
          <div className="data">
            <h4>Total Expenses</h4>
            <p>{renderApp ? <div>Rs. {count.ticket_amount}</div> : <div>Loading...</div>}</p> {/* Replace with actual data */}
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default CustomerDashboardContent;

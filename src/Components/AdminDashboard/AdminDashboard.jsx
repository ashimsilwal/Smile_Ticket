import React from 'react';
import { Outlet } from 'react-router-dom';

import './AdminDashboard.css';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Header head='Ticketing System Customer'/>
        <Outlet /> 
      </div>
    </div>
  );
};

export default AdminDashboard;
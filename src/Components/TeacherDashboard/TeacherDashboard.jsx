import React from 'react';
import { Outlet } from 'react-router-dom';
import './TeacherDashboard.css';
import Header from '../AdminDashboard/Header/Header'; // Assuming you're reusing the Header
import Sidebar from './Sidebar/Sidebar';




const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard">
      <Sidebar />
      <div className="main-content">
        <Header head='Bus Passenger Dashboard'/>
        <Outlet /> 
      </div>
    </div>
  );
};

export default TeacherDashboard;
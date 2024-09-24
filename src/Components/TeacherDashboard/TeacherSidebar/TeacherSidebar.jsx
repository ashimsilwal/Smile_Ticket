import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './TeacherSidebar.css';
import { FaCalendarCheck, FaClock, FaSignOutAlt, FaBus } from 'react-icons/fa'; // Import FaBus for the bus icon
import { MdDashboard } from 'react-icons/md';

const TeacherSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const handleBuyTicket = () => {
    navigate('/buy-ticket'); // You can set this to the correct route for the bus ticket purchase form
  };

  return (
    <div className="sidebar">
      <div className="logo">
        A 
      </div>
      <ul className="nav-list">
        <li>
          <NavLink to="/admin/dashboard" className="nav-link">
            <MdDashboard className="icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/attendance" className="nav-link">
            <FaCalendarCheck className="icon" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/scheduling" className="nav-link">
            <FaClock className="icon" />
          </NavLink>
        </li>
      </ul>
      
      {/* Buy Bus Ticket Button */}
      <button onClick={handleBuyTicket} className="buy-ticket-btn">
        <FaBus className="icon" /> Buy Bus Ticket
      </button>

      <button onClick={handleLogout} className="logout-btn">
        <FaSignOutAlt className="icon" /> Logout
      </button>
    </div>
  );
};

export default TeacherSidebar;

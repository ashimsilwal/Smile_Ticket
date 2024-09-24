import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { MdDashboard } from 'react-icons/md'; // Import MdDashboard
import { FaCalendarCheck, FaVideo, FaSignOutAlt } from 'react-icons/fa'; // Import other icons
import { TbBusStop } from 'react-icons/tb';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div className="logo">A</div>

      <ul className="nav-list">
        <li>
          <NavLink to="/admin/dashboard" className="nav-link">
            <MdDashboard className="icon" /> 
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/ticket" className="nav-link">
            <FaCalendarCheck className="icon" />
          </NavLink>
        </li>
        
      </ul>

      <button onClick={handleLogout} className="logout-btn">
        <FaSignOutAlt className="icon" /> 
      </button>
    </div>
  );
};

export default Sidebar;